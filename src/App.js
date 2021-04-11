// @ts-check
import "./styles/main.scss";
import { podcasts as podcastsService } from "services/index";
import React, { useEffect, useState } from "react";
import Podcast from "components/Podcast/index";
import Player from "components/Player/index";
import { produce } from "immer";
import { PODCAST_STATE } from "constants/index";

/** @typedef {import("services/index").Podcast} Podcast */
/**
 * @typedef {{
 *   play: (x: Podcast) => void,
 *   pause: (x: Podcast) => void,
 *   backTen: (x: Podcast) => void,
 *   nextTen: (x: Podcast) => void
 * }} Handlers
 * */

const audio = new Audio();

/**
 * @returns {[{ podcasts: Podcast[], selectedPodcast: Podcast }, Handlers]}
 */
function usePodcasts() {
  /** @type {[Podcast[], React.Dispatch<Podcast[]>]} */
  const [podcasts, setPodcasts] = useState([]);

  /** @type {[Podcast, React.Dispatch<Podcast>]} */
  const [selected, select] = useState(null);

  useEffect(() => {
    podcastsService.getAll().then((podcasts) => {
      setPodcasts(podcasts);
    });
  }, []);

  /** @type {Handlers} */
  const handlers = {
    play: (podcast) => {
      setPodcasts(
        produce(podcasts, (draft) => {
          draft.forEach((p) => {
            p.state = PODCAST_STATE.initial;
          });
          const selected = draft.find((p) => p.guid === podcast.guid);
          selected.state = PODCAST_STATE.playing;
        })
      );
      select(
        produce(podcast, (draft) => {
          draft.state = PODCAST_STATE.playing;
        })
      );
      audio.setAttribute("src", podcast.link.getAttribute("url"));
      audio.currentTime = podcast.time;
      audio.play();
    },
    pause: (podcast) => {
      setPodcasts(
        produce(podcasts, (draft) => {
          const selected = draft.find((p) => p.guid === podcast.guid);
          selected.state = PODCAST_STATE.pause;
          selected.time = audio.currentTime;
        })
      );
      select(
        produce(podcast, (draft) => {
          draft.state = PODCAST_STATE.pause;
          draft.time = audio.currentTime;
        })
      );
      audio.pause();
    },
    backTen: (podcast) => {
      setPodcasts(
        produce(podcasts, (draft) => {
          const selected = draft.find((p) => p.guid === podcast.guid);
          audio.currentTime -= 10;
          selected.time = audio.currentTime;
        })
      );
      select(
        produce(podcast, (draft) => {
          draft.time = audio.currentTime;
        })
      );
    },
    nextTen: (podcast) => {
      setPodcasts(
        produce(podcasts, (draft) => {
          const selected = draft.find((p) => p.guid === podcast.guid);
          audio.currentTime += 10;
          selected.time = audio.currentTime;
        })
      );
      select(
        produce(podcast, (draft) => {
          draft.time = audio.currentTime;
        })
      );
    },
  };

  return [{ podcasts, selectedPodcast: selected }, handlers];
}

function App() {
  const [{ podcasts, selectedPodcast }, handlers] = usePodcasts();

  return (
    <div className="App">
      <div className="podcasts-container">
        {podcasts.map((podcast, index) => (
          <Podcast
            handlers={handlers}
            podcast={podcast}
            index={index}
            key={podcast.guid}
          />
        ))}
      </div>
      <Player podcast={selectedPodcast} handlers={handlers} />
    </div>
  );
}

export default App;
