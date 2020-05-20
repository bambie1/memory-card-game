import React from "react";
import "./Card.scss";

const Card = ({ id, src, name, handleClick, flipped }) => {
  return (
    <div
      className={`card-component ${flipped ? "flipped" : ""}`}
      onClick={() => {
        handleClick(id);
      }}
    >
      <img className="card-front" src={src} alt={name} />
      <img className="card-back" src="/assets/card-front.jpg" alt="logo" />
    </div>
  );
};

export default Card;
