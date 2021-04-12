// @ts-check
import { PODCAST_STATE } from "../../constants";
import SvgBackTen from "assets/icons/backTen";
import SvgForwardTen from "assets/icons/forwardTen";
import SvgPlay from "assets/icons/play";
import SvgPlayButtonPause from "assets/icons/pause";
import { Slider } from "@material-ui/core";
/**
 * @param {{podcast: import("services/index").Podcast, handlers: import("App").Handlers}} props
 * @returns
 */
export default function Player({ podcast, handlers }) {
  if (!podcast) return <div></div>;
  return (
    <div className="ilo-player">
      <div className="ilo-player__slider">
        <Slider
          value={podcast.time}
          min={0}
          max={podcast.duration}
          onChange={(_event, /** @type {number} */ value) =>
            handlers.setTime(value)
          }
          aria-labelledby="continuous-slider"
        />
      </div>
      <div className="ilo-player__main">
        <div className="ilo-player__details">
          <div className="ilo-player__artworkContainer">
            <img className="ilo-player__artwork" src={podcast.artwork} alt="" />
          </div>
          <div className="ilo-player__text">
            <h3 className="ilo-player__title">{podcast.title}</h3>
            <p className="ilo-player__restTime">32min restantes</p>
          </div>
        </div>
        <div className="ilo-player__actions">
          <button
            onClick={() => handlers.backTen()}
            className="ilo-iconButton--brand--m"
            aria-label="retroceder 10 segundos"
          >
            <SvgBackTen aria-hidden="true" focusable="false" />
          </button>
          <button
            onClick={() => handlers.play(podcast)}
            className="ilo-iconButton--brand--m"
            hidden={
              ![PODCAST_STATE.pause, PODCAST_STATE.stopped].includes(
                podcast.state
              )
            }
            aria-label="play podcast"
          >
            <SvgPlay aria-hidden="true" focusable="false" />
          </button>
          <button
            onClick={() => handlers.pause()}
            className="ilo-iconButton--brand--m"
            hidden={[PODCAST_STATE.pause, PODCAST_STATE.stopped].includes(
              podcast.state
            )}
            aria-label="pause podcast"
          >
            <SvgPlayButtonPause aria-hidden="true" focusable="false" />
          </button>
          <button
            onClick={() => handlers.nextTen()}
            className="ilo-iconButton--brand--m"
            aria-label="avanzar 10 segundos"
          >
            <SvgForwardTen />
          </button>
        </div>
      </div>
    </div>
  );
}
