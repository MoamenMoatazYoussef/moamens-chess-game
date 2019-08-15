import React, { Component } from "react";
import { Col } from "react-bootstrap";
import { SQUARE_SIDE_LENGTH } from "../../constants/constants.js";

import "./square.css";

class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: this.props.position,
      color: this.props.backgroundColor,
      currentPiece: null
    };
  }

  get position() {
    return this.state.position;
  }

  render() {
    const { children, onSquareClick } = this.props;
    return (
      <div className="d-flex"
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
