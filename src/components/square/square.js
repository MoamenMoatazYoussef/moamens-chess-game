import React, { Component } from "react";
import { SQUARE_SIDE_LENGTH } from "../../constants/constants.js";
import { Col } from 'react-bootstrap';

import "./square.css";

class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: this.props.position,
      color: this.props.backgroundColor,
      piece: this.props.pieceID
    };
  }

  get position() {
    return this.state.position;
  }

  render() {
    const { children, onSquareClick, highlighted } = this.props;
    return (
      <Col //className="d-flex"
        xs={1}
        // className={highlighted}
        style={{
          width: SQUARE_SIDE_LENGTH,
          height: SQUARE_SIDE_LENGTH,
          backgroundColor: this.state.color,
          border: highlighted
        }}
        onClick={() => onSquareClick(this.state.position)}
      >
        {children}
      </Col>
    );
  }
}

export default Square;
