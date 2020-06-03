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
  togglePause,
  quitGame,
  startClock,
}) => {
  const [flippedCards, setFlippedCards] = useState([]);
  const [solved, setSolved] = useState([]);
  const [paused, setPaused] = useState(false);
  const [disabled, setDisabled] = useState(timePassed === timeLimit);

  const solvedFraction = solved.length / images.length;
  if (timeLimit === timePassed) timeUp(solvedFraction * 100);

  const handleClick = (id) => {
    startClock();
    if (!(timePassed === timeLimit)) {
      setDisabled(true);
      if (flippedCards.length === 0) {
        setFlippedCards([...flippedCards, id]);
        setDisabled(false);
      } else {
        if (sameCardClicked(id)) {
          setDisabled(false);
          return;
        }
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

  const cancelGame = () => {
    setPaused(true);
    if (window.confirm("Are you sure you want to quit?")) quitGame();
    else if (!paused) setPaused(false);
  };

  const cardsMatch = (id) => {
    var clickedCard = images.find((image) => image.id === id);
    var openCard = images.find((image) => image.id === flippedCards[0]);
    return clickedCard.name === openCard.name;
  };
  return (
    <div
      className={`game-board ${
        timePassed === timeLimit || solvedFraction === 1 ? "finished" : ""
      } `}
    >
      <div className="game-time">
        <Timer timeLeft={timeLimit - timePassed} timeLimit={timeLimit} />
        <button
          className={`pause-resume ${timePassed > 0 ? "show" : "hide"}`}
          onClick={() => {
            paused ? togglePause(1) : togglePause(0);
            setDisabled(!disabled);
            setPaused(!paused);
          }}
        >
          {paused ? "Resume" : "Pause Game"}
        </button>
      </div>

      <div
        className={`board ${timePassed === timeLimit ? "ended" : ""} ${
          paused || disabled ? "disabled" : ""
        }`}
      >
        {images.map(({ id, ...otherProps }) => (
          <Card
            key={id}
            {...otherProps}
            flipped={flippedCards.includes(id)}
            handleClick={() => handleClick(id)}
            disabled={disabled || solved.includes(id)}
            solved={solved.includes(id)}
            width={
              images.length <= 16
                ? "small"
                : images.length > 20
                ? "big"
                : "medium"
            }
          />
        ))}
      </div>
      <div className="progress-quit">
        <GameProgress solvedFraction={solvedFraction} />
        <button className="quit-game" onClick={cancelGame}>
          Quit game
        </button>
      </div>
    </div>
  );
};

export default Board;
