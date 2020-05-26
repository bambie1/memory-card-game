import React from "react";

const GameResults = ({ percentageComplete, handleClick }) => {
  return (
    <div className="game-results">
      {percentageComplete === 100 ? (
        <div>You conquered!</div>
      ) : (
        <div>
          <h3>TIME'S UP!!</h3>
          <h4>
            <span>{percentageComplete.toFixed(2)}</span>%{" "}
          </h4>
          <p>You'll do better next time</p>
        </div>
      )}
      <button className="play-again" onClick={() => handleClick()}>
        Play again
      </button>
    </div>
  );
};

export default GameResults;
