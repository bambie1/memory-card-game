import React from "react";
import CircleTracker from "../CircleTracker/CircleTracker";
import "./Timer-Progress.scss";
import colorCodes from "./colorCodes";

const GameProgress = ({ solvedFraction }) => {
  var remainingPathColor = colorCodes(solvedFraction);
  return (
    <div className="game-progress">
      <CircleTracker
        fraction={solvedFraction}
        displayText={`${solvedFraction * 100}%`}
        strokeColor={remainingPathColor}
      />
    </div>
  );
};

export default GameProgress;
