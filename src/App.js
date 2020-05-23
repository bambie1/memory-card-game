import React, { useState, useEffect } from "react";
import Board from "./components/Board/Board";
import Timer from "./components/Timer-And-Progress/Timer";
import "./App.css";
import Images from "./card-list";
import duplicateAndShuffle from "./duplicateAndShuffle";

const App = () => {
  var size = 8;
  var timeLimit = 45;
  var timer = 0;
  const [images, setImages] = useState([]);
  const [timePassed, setTimePassed] = useState(0);

  useEffect(() => {
    setImages(duplicateAndShuffle(Images.slice(0, size)));
  }, []);

  useEffect(() => {
    startTimer();
  }, [timePassed]);

  const startTimer = () => {
    timer = setTimeout(() => {
      timePassed < timeLimit && setTimePassed(timePassed + 1);
    }, 1000);
  };
  const solveBoard = () => {
    if (timer) {
      console.log("timer: ", timer);
      clearTimeout(timer);
      timer = 0;
    }
  };

  return (
    <div className="App">
      <Timer timeLeft={timeLimit - timePassed} timeLimit={timeLimit} />
      <Board
        images={images}
        solveBoard={solveBoard}
        gameOver={timePassed === timeLimit}
      />
    </div>
  );
};

export default App;
