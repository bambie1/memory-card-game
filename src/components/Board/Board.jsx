import React, { Fragment, useState } from "react";
import Card from "../Card/Card";
import "./Board.scss";

const Board = ({ gameOver, images }) => {
  const [flippedCards, setFlippedCards] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(gameOver);

  console.log("disabled? ", disabled, gameOver);
  const handleClick = (id) => {
    if (!gameOver) {
      setDisabled(true);
      console.log("starting flipped: ", flippedCards);
      if (flippedCards.length === 0) {
        setFlippedCards([...flippedCards, id]);
        console.log("first flipped: ", flippedCards);
        setDisabled(false);
      } else {
        if (sameCardClicked(id)) return;
        console.log("pre setFlipped: ", flippedCards, id);
        setFlippedCards([flippedCards[0], id]);
        if (cardsMatch(id)) {
          console.log("matched: ", flippedCards);
          setSolved([...solved, flippedCards[0], id]); //spreading the flipped array didn't work before
          // setTimeout(resetCards, 1500);
          resetCards();
        } else setTimeout(resetCards, 1000);
      }
      //
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
    <Fragment>
      <div className={`board ${gameOver ? "ended" : ""}`}>
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
      {solved.length === images.length ? (
        <div>SOLVED!</div>
      ) : (
        <div>NOT SOLVED... {`${(solved.length * 100) / images.length} %`}</div>
      )}
    </Fragment>
  );
};

export default Board;
