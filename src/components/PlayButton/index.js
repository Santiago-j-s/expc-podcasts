// @ts-check
import ArcIcon from "components/ArcIcon/index";
import { PODCAST_STATE } from "constants/index";

/** Object with the Icons from playButton */
const ICONS = {
  /** icono de reproducción */
  initial: () => (
    <svg
      className="ilo-button-icon"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      aria-label="play podcast"
    >
      <path
        id="arc1"
        fill="none"
        stroke="#0078D4"
        strokeWidth="1.82"
        d="M 11.841357625485093 2.911384451028404 A 9.09 9.09 0 1 0 12 2.91"
      />
      <path
        d="M15.6359 11.9998L10.1814 15.9362V8.06348L15.6359 11.9998Z"
        fill="#0078D4"
      />
    </svg>
  ),
  /** Tres barras animadas que representan el sonido reproduciendosé */
  playing: () => (
    <svg
      id="svgSound-playing0"
      className="svgSound-playing"
      height="24px"
      strokeWidth="4"
      viewBox="-12 -12 24 24"
    >
      <g name="HGYFec">
        {" "}
        {/* TODO: Consultar fede, tenía atributo jsName en lugar de name */}
        <line className="leftLine" x1="-6" x2="-6" y1="8" y2="-8" />
        <line className="middleLine" x1="0" x2="0" y1="8" y2="-8" />
        <line className="rightLine" x1="6" x2="6" y1="8" y2="-8" />
      </g>
    </svg>
  ),
  /** Icono que representa al podcast finalizado */
  finished: () => (
    <svg
      className="ilo-button-icon"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 20.1818C13.0745 20.1818 14.1384 19.9702 15.131 19.559C16.1237 19.1478 17.0257 18.5452 17.7854 17.7854C18.5452 17.0257 19.1478 16.1237 19.559 15.131C19.9702 14.1384 20.1818 13.0745 20.1818 12C20.1818 10.9255 19.9702 9.86162 19.559 8.86895C19.1478 7.87629 18.5452 6.97433 17.7854 6.21458C17.0257 5.45483 16.1237 4.85216 15.131 4.44099C14.1384 4.02981 13.0745 3.81818 12 3.81818C9.83005 3.81818 7.74897 4.68019 6.21458 6.21458C4.68019 7.74897 3.81818 9.83005 3.81818 12C3.81818 14.17 4.68019 16.251 6.21458 17.7854C7.74897 19.3198 9.83005 20.1818 12 20.1818V20.1818ZM12 22C17.5227 22 22 17.5227 22 12C22 6.47727 17.5227 2 12 2C6.47727 2 2 6.47727 2 12C2 17.5227 6.47727 22 12 22Z"
        fill="#D0D0D0"
      />
      <path
        d="M15.6359 11.9998L10.1814 15.9362V8.06348L15.6359 11.9998Z"
        fill="#D0D0D0"
      />
      <circle cx="18" cy="18" r="6" fill="white" />
      <path
        d="M16.5 20.0852L14.765 18.3502C14.57 18.1552 14.255 18.1552 14.06 18.3502C13.865 18.5452 13.865 18.8602 14.06 19.0552L16.15 21.1452C16.345 21.3402 16.66 21.3402 16.855 21.1452L22.145 15.8552C22.34 15.6602 22.34 15.3452 22.145 15.1502C21.95 14.9552 21.635 14.9552 21.44 15.1502L16.5 20.0852Z"
        fill="#3F8F3D"
      />
    </svg>
  ),
  /**
   *
   * @param {!number} angle angle from 0 to 359.
   * @param {!number} size The size of the element
   * @param {!number} radius The diameter of the circunference
   *
   * @returns {JSX.Element}
   */
  pause: (angle, size, radius) => {
    return (
      <svg
        className="ilo-button-icon"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        aria-label="play podcast"
      >
        <ArcIcon angle={angle} size={size} radius={radius} />
        <path
          d="M15.6359 11.9998L10.1814 15.9362V8.06348L15.6359 11.9998Z"
          fill="#0078D4"
        />
      </svg>
    ); // ...is what `this` is here.
  },
};

/**
 * @param {{
 *   number: number,
 *   ariaLabel?: string,
 *   label: string,
 *   icon: JSX.Element
 * }} param0
 */
const Button = ({ number, ariaLabel, label, icon }) => (
  <button
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

  return <Button number={props.number} {...buttonProps[props.state]} />;
}
