// @ts-check
import { PODCAST_STATE } from "constants/index";
import Finished from "icons/PlayButton/finished";
import Initial from "icons/PlayButton/initial";
import Pause from "icons/PlayButton/pause";
import Playing from "icons/PlayButton/playing";

/** Object with the Icons from playButton */
const ICONS = {
  initial: Initial,
  playing: Playing,
  finished: Finished,
  /**
   * @param {number} angle
   * @param {number} size
   * @param {number} radius
   */
  pause: (angle, size, radius) => Pause({ angle, size, radius }),
};

/**
 * @param {{
 *   number: number,
 *   ariaLabel?: string,
 *   label: string,
 *   icon: JSX.Element,
 *   onClick: Function
 * }} param0
 */
const Button = ({ number, ariaLabel, label, icon, onClick }) => (
  <button
    onClick={() => onClick()}
    id={`playButton-${number}`}
    className={"ilo-button ilo-button--outlined yourRippleEffectClass"}
    aria-label={ariaLabel}
    type="button"
  >
    {icon}
    <span className="ilo-button__label">{label}</span>
  </button>
);

/**
 * @param {{
 *   play: Function,
 *   number: number,
 *   state: string,
 *   duration: number,
 *   timeLeft: number,
 *   timeAngle: number
 * }} props
 * @returns
 */
export default function PlayButton(props) {
  /** @typedef {{label: string, icon: JSX.Element, ariaLabel?: string}} ButtonProps */

  /** @type {Object<string, ButtonProps>} */
  const buttonProps = {
    [PODCAST_STATE.initial]: {
      label: ` ${props.duration} minutos`,
      icon: ICONS.initial(),
      ariaLabel: "play podcast",
    },
    [PODCAST_STATE.pause]: {
      label: ` quedan ${props.timeLeft} minutos`,
      icon: ICONS.pause(props.timeAngle, 24, 9.09),
      ariaLabel: "play podcast",
    },
    [PODCAST_STATE.stopped]: {
      label: ` quedan ${props.timeLeft} minutos`,
      icon: ICONS.pause(props.timeAngle, 24, 9.09),
      ariaLabel: "play podcast",
    },
    [PODCAST_STATE.playing]: {
      label: " reproduciendo",
      icon: ICONS.playing(),
    },
    [PODCAST_STATE.finished]: {
      label: " Finalizado ",
      icon: ICONS.finished(),
    },
  };

  return (
    <Button
      onClick={() => props.play()}
      number={props.number}
      {...buttonProps[props.state]}
    />
  );
}
