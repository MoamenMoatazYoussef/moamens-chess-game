import React, { Component } from "react";
import { SQUARE_SIDE_LENGTH } from "../../constants/constants.js";

import "./square.css";

class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: this.props.position,
      color: this.props.backgroundColor
    };
  }

  get position() {
    return this.state.position;
  }

  render() {
    const { children, onSquareClick, className } = this.props;
    const classes = `d-flex ${className}`
    return (
      <div className={classes}
        // xs={1}
        style={{
          width: SQUARE_SIDE_LENGTH,
          height: SQUARE_SIDE_LENGTH,
          backgroundColor: this.state.color
        }}
        onClick={() => onSquareClick(this.state.position)}
      >
        {children}
      </div>
    );
  }
}

export default Square;
