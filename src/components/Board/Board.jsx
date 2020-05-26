import React, { useState } from "react";
import Card from "../Card/Card";
import "./Board.scss";
import GameProgress from "../Timer-And-Progress/GameProgress";
import Timer from "../Timer-And-Progress/Timer";

const Board = ({
  timeLimit,
  timePassed,
  images,
  solveBoard,
  timeUp,
  pause,
  resume,
}) => {
  const [flippedCards, setFlippedCards] = useState([]);
  const [solved, setSolved] = useState([]);
  const [paused, setPaused] = useState(false);
  const [disabled, setDisabled] = useState(timePassed === timeLimit);

  const solvedFraction = solved.length / images.length;
  if (timeLimit === timePassed) timeUp(solvedFraction * 100);

  const handleClick = (id) => {
    if (!(timePassed === timeLimit)) {
      setDisabled(true);
      if (flippedCards.length === 0) {
        setFlippedCards([...flippedCards, id]);
        setDisabled(false);
      } else {
        if (sameCardClicked(id)) return;
        setFlippedCards([flippedCards[0], id]);
        if (cardsMatch(id)) {
          setSolved([...solved, flippedCards[0], id]); //spreading the flipped array didn't work before
          resetCards();
          if (solved.length + 2 === images.length) {
            solveBoard();
          }
        } else setTimeout(resetCards, 700);
      }
    }
  };

  const resetCards = () => {
    setFlippedCards([]);
    setDisabled(false);
  };

  const sameCardClicked = (id) => flippedCards.includes(id);

  const cardsMatch = (id) => {
    var clickedCard = images.find((image) => image.id === id);
    var openCard = images.find((image) => image.id === flippedCards[0]);
    return clickedCard.name === openCard.name;
  };
  return (
    <div
      className={`game-board ${
        timePassed === timeLimit || solvedFraction === 1 ? "finished" : ""
      }`}
    >
      <div
        className="pause-resume"
        onClick={() => {
          paused ? resume() : pause();
          setDisabled(!disabled);
          setPaused(!paused);
        }}
      >
        {paused ? "Resume" : "Pause Game"}
      </div>
      <Timer timeLeft={timeLimit - timePassed} timeLimit={timeLimit} />
      <div className={`board ${timePassed === timeLimit ? "ended" : ""}`}>
        {images.map(({ id, ...otherProps }) => (
          <Card
            key={id}
            {...otherProps}
            flipped={flippedCards.includes(id)}
            handleClick={() => handleClick(id)}
            disabled={disabled || solved.includes(id)}
            solved={solved.includes(id)}
          />
        ))}
      </div>
      <GameProgress solvedFraction={solvedFraction} />
    </div>
  );
};

export default Board;
