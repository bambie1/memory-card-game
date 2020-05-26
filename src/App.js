import React, { useState, useEffect } from "react";
import Board from "./components/Board/Board";
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
  const [isGameTime, setIsGameTime] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    setImages(duplicate(shuffle(Images).slice(0, size)));
  }, [size]);

  useEffect(() => {
    isGameTime && startTimer();
  }, [timePassed, timeLimit]);

  const startTimer = () => {
    timer = setTimeout(() => {
      timePassed < timeLimit && setTimePassed(timePassed + 1);
    }, 1000);
  };
  const solveBoard = () => {
    if (timer) {
      clearTimeout(timer);
      setSolved(100);
      timer = 0;
    }

    setIsGameOver(true);
    setIsGameTime(false);
  };
  const timeUp = (solvedPerc) => {
    setSolved(solvedPerc);
    setIsGameOver(true);
    setIsGameTime(false);
  };
  const handleBackToGame = () => {
    setIsGameOver(false);
    setIsGameTime(false);
  };
  const togglePauseGame = (num) => {
    num === 0 ? clearTimeout(timer) : startTimer();
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
    startTimer();
    setIsGameTime(true);
    setTimePassed(0);
  };
  return (
    <div className="App">
      {/* <div className="user-div"> */}
      {isGameTime ? (
        <Board
          images={images}
          solveBoard={solveBoard}
          timePassed={timePassed}
          timeLimit={timeLimit}
          timeUp={timeUp}
          togglePause={togglePauseGame}
        />
      ) : isGameOver ? (
        <GameResults
          percentageComplete={solved}
          handleClick={handleBackToGame}
        />
      ) : (
        <GameSettings handleGameStart={gameStart} />
      )}
      {/* </div> */}
    </div>
  );
};

export default App;
