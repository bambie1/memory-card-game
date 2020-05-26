import React from "react";
import "./Card.scss";

const Card = ({
  id,
  disabled,
  src,
  name,
  handleClick,
  flipped,
  solved,
  width,
}) => {
  return (
    <div
      className={`card-component ${flipped || solved ? "flipped" : ""} ${
        solved ? "solved" : ""
      } ${width}`}
      onClick={() => {
        !disabled && handleClick(id);
      }}
    >
      <img className={"card-front"} src={src} alt={name} />
      <img className={"card-back"} src="/assets/card-front.jpg" alt="logo" />
    </div>
  );
};

export default Card;
