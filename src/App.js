import React, { useState, useEffect } from "react";
import Board from "./components/Board/Board";
import "./App.css";
import Images from "./card-list";
import duplicateAndShuffle from "./duplicateAndShuffle";

function App() {
  var size = 8;
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(duplicateAndShuffle(Images.slice(0, size)));
  }, []);

  return (
    <div className="App">
      <Board images={images} />
    </div>
  );
}

export default App;
