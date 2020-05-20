import React, { useState } from "react";
import Card from "../Card/Card";
import "./Board.scss";
import Images from "./card-list";

const Board = () => {
  const [flippedCards, setFlippedCards] = useState([]);
  const handleClick = (id) => setFlippedCards([...flippedCards, id]);

  // var size = 8;
  // var displayDeck = Images.splice(0, size)
  return (
    <div className="board">
      {Images.map(({ id, ...otherProps }) => (
        <Card
          key={id}
          {...otherProps}
          flipped={flippedCards.includes(id)}
          handleClick={() => handleClick(id)}
        />
      ))}
    </div>
  );
};

export default Board;
