import React from "react";
import "./Timer.scss";
import colorCodes from "./colorCodes";

function formatTimeLeft(time) {
  var minutes = Math.floor(time / 60);
  let seconds = time % 60;
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

const Timer = ({ timeLeft, timeLimit }) => {
  var fraction = timeLeft / timeLimit;
  var clockFraction = fraction - (1 / timeLimit) * (1 - fraction);
  var remainingPathColor = colorCodes(clockFraction);
  console.log("pathcolor: ", remainingPathColor);
  return (
    <div className="timer">
      <svg
        className="timer-svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="timer-circle">
          <circle className="timer-path-elapsed" cx="50" cy="50" r="45" />
          <path
            strokeDasharray={`${(clockFraction * 283).toFixed(0)} 283`}
            id="timer-path-remaining"
            className={`timer-path-remaining ${remainingPathColor}`}
            style={{ stroke: remainingPathColor }}
            d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
          ></path>
        </g>
      </svg>
      <span className="timer-label">{formatTimeLeft(timeLeft)}</span>
    </div>
  );
};

export default Timer;
