// @ts-check
import "./podcasts.css";
import { podcasts as podcastsService } from "services/index";
import { useEffect, useState } from "react";
import Podcast from "components/Podcast/index";
import Player from "components/Player/index";

/** @typedef {import("services/index").Podcast} Podcast */
/** @typedef {import("react").SetStateAction<Podcast[]>} SetStateActionPodcasts */
/** @typedef {import("react").Dispatch<SetStateActionPodcasts>} DispatchPodcasts */

function App() {
  /** @type {[Podcast[], DispatchPodcasts]} */
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    podcastsService.getAll().then((podcasts) => {
      setPodcasts(podcasts);
    });
  }, []);

  return (
    <div className="App">
      {podcasts.map((podcast, index) => (
        <Podcast podcast={podcast} index={index} key={podcast.title} />
      ))}
      <Player />
    </div>
  );
}

export default App;
