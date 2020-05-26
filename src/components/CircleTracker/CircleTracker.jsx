import React from "react";
import "./CircleTracker.scss";

const CircleTracker = ({ fraction, strokeColor, displayText }) => {
  return (
    <div className="tracker">
      <svg
        className="tracker-svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="tracker-circle">
          <circle className="tracker-path-elapsed" cx="50" cy="50" r="45" />
          <path
            strokeDasharray={`${(fraction * 283).toFixed(0)} 283`}
            id="tracker-path-remaining"
            className={`tracker-path-remaining`}
            style={{ stroke: strokeColor }}
            d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0 "
          ></path>
        </g>
      </svg>
      <span className="tracker-label">{displayText}</span>
    </div>
  );
};

export default CircleTracker;
