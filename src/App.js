// @ts-check
import "./styles/main.scss";
//import "./podcasts.css";
import { podcasts as podcastsService } from "services/index";
import { useEffect, useState } from "react";
import Podcast from "components/Podcast/index";
import Player from "components/Player/index";
import { produce } from "immer";
import { PODCAST_STATE } from "constants/index";

/** @typedef {import("services/index").Podcast} Podcast */
/** @typedef {import("react").SetStateAction<Podcast[]>} SetStateActionPodcasts */
/** @typedef {import("react").Dispatch<SetStateActionPodcasts>} DispatchPodcasts */

function App() {
  /** @type {[Podcast[], DispatchPodcasts]} */
  const [podcasts, setPodcasts] = useState([]);
  const [selectedPodcast, selectPodcast] = useState(null);

  useEffect(() => {
    podcastsService.getAll().then((podcasts) => {
      setPodcasts(podcasts);
    });
  }, []);

  const getPodcast = () => podcasts.find((p) => p.guid === selectedPodcast);

  /**
   * @param {Podcast[]} podcasts
   * @param {string} guid
   */
  const updatePodcast = (podcasts, guid) =>
    produce(podcasts, (draft) => {
      draft.forEach((p) => {
        p.state = PODCAST_STATE.initial;
      });
      const podcast = draft.find((p) => p.guid === guid);
      podcast.state = PODCAST_STATE.playing;
    });

  /**
   * @param {string} guid
   */
  const playPodcast = (guid) => {
    selectPodcast(guid);
    setPodcasts((podcasts) => updatePodcast(podcasts, guid));
  };

  return (
    <div className="App">
      {podcasts.map((podcast, index) => (
        <Podcast
          playPodcast={playPodcast}
          podcast={podcast}
          index={index}
          key={podcast.title}
        />
      ))}
      <Player podcast={getPodcast()} />
    </div>
  );
}

export default App;
