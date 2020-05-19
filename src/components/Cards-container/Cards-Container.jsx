import React, { Component } from "react";
import Card from "../Card/Card";
import "./Cards-Container.scss";

class CardsContainer extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div className="cards-container">
        <Card />
      </div>
    );
  }
}

export default CardsContainer;
