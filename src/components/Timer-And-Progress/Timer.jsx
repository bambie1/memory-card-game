import React from "react";
import "./Timer-Progress.scss";
import colorCodes from "./colorCodes";
import CircleTracker from "../CircleTracker/CircleTracker";

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
  return (
    <div className="timer">
      <CircleTracker
        fraction={clockFraction}
        displayText={formatTimeLeft(timeLeft)}
        strokeColor={remainingPathColor}
      />
    </div>
  );
};

export default Timer;
