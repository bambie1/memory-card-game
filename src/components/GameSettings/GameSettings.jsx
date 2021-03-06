import React from "react";
import "./GameSettings.scss";

const GameSettings = ({ handleGameStart }) => {
  const handleClick = (e) => {
    const { name } = e.target;
    handleGameStart(name);
  };
  return (
    <div className="game-settings">
      <h2>
        MEMORY <span id="flip-animation">FLIP</span>
      </h2>
      <div>
        <button name="easy" onClick={handleClick}>
          EASY
        </button>
        <button name="medium" onClick={handleClick}>
          MEDIUM
        </button>
        <button name="hard" onClick={handleClick}>
          HARD
        </button>
      </div>
    </div>
  );
};

export default GameSettings;
