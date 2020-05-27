import React, { useState, useEffect } from "react";
import Board from "./components/Board/Board";
import { CSSTransition } from "react-transition-group";
import GameSettings from "./components/GameSettings/GameSettings";
import GameResults from "./components/GameResults/GameResults";
import "./App.css";
import Images from "./card-list";
import duplicate, { shuffle } from "./duplicateAndShuffle";

const App = () => {
  var timer = 0;
  const [solved, setSolved] = useState(0);
  const [size, setSize] = useState(0);
  const [timeLimit, setTimeLimit] = useState(0);
  const [images, setImages] = useState([]);
  const [timePassed, setTimePassed] = useState(0);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [isGameTime, setIsGameTime] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    setImages(duplicate(shuffle(Images).slice(0, size)));
  }, [size]);

  useEffect(() => {
    isGameTime && hasGameStarted && startTimer();
  }, [timePassed, timeLimit, hasGameStarted]);

  const startTimer = () => {
    if (hasGameStarted) {
      timer = setTimeout(() => {
        timePassed < timeLimit && setTimePassed(timePassed + 1);
      }, 1000);
    }
  };
  const solveBoard = () => {
    if (timer) {
      clearTimeout(timer);
      setSolved(100);
      timer = 0;
    }
    endGame();
  };
  const timeUp = (solvedPerc) => {
    setSolved(solvedPerc);
    endGame();
  };
  function endGame() {
    setIsGameOver(true);
    setIsGameTime(false);
  }
  function restartGame() {
    clearTimeout(timer);
    timer = 0;
    setTimePassed(0);
    setIsGameOver(false);
    setIsGameTime(false);
  }
  const handleBackToGame = () => {
    restartGame();
  };
  const togglePauseGame = (num) => {
    if (num === 0) {
      clearTimeout(timer);
      timer = 0;
    } else startTimer();
  };

  const gameStart = (name) => {
    console.log("game start");
    switch (name) {
      case "easy":
        setTimeLimit(60);
        setSize(8);
        break;
      case "medium":
        setTimeLimit(45);
        setSize(10);
        break;
      case "hard":
        setTimeLimit(30);
        setSize(12);
        break;
      default:
        break;
    }
    setHasGameStarted(false);
    setIsGameTime(true);
    setTimePassed(0);
  };
  return (
    <div className="App">
      {/* {isGameTime ? ( */}
      <CSSTransition
        in={!isGameTime && !isGameOver}
        timeout={300}
        classNames="my-node"
        exit={false}
        unmountOnExit
      >
        <GameSettings handleGameStart={gameStart} />
      </CSSTransition>

      <CSSTransition
        in={isGameTime}
        timeout={300}
        classNames="my-node"
        exit={false}
        unmountOnExit
      >
        <Board
          images={images}
          solveBoard={solveBoard}
          timePassed={timePassed}
          timeLimit={timeLimit}
          timeUp={timeUp}
          togglePause={togglePauseGame}
          quitGame={restartGame}
          startClock={() => setHasGameStarted(true)}
        />
      </CSSTransition>
      <CSSTransition
        in={!isGameTime && isGameOver}
        timeout={300}
        classNames="my-node"
        unmountOnExit
        exit={false}
      >
        <GameResults
          percentageComplete={solved}
          handleClick={handleBackToGame}
        />
      </CSSTransition>
    </div>
  );
};

export default App;
