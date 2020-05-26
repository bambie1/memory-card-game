import React from "react";
import "./GameSettings.scss";

const GameSettings = ({ handleGameStart }) => {
  const handleClick = (e) => {
    const { name } = e.target;
    handleGameStart(name);
  };
  return (
    <div className="game-settings">
      <h3>MEMORY FLIP</h3>
      <div>
        <button name="easy" onClick={handleClick}>
          Easy
        </button>
        <button name="medium" onClick={handleClick}>
          Medium
        </button>
        <button name="hard" onClick={handleClick}>
          Hard
        </button>
      </div>
    </div>
  );
};

export default GameSettings;
