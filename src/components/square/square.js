import React, { Component } from "react";
import { Col } from "react-bootstrap";
import { SQUARE_SIDE_LENGTH } from "../../constants/constants.js";

import "./square.css";

class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {
        x: this.props.x,
        y: this.props.y
      },
      color: this.props.backgroundColor,
      currentPiece: null
    };
  }

  render() {
    const children = this.props.children;
    return (
      <Col
        xs={1}
        style={{
          width: SQUARE_SIDE_LENGTH,
          height: SQUARE_SIDE_LENGTH,
          backgroundColor: this.state.color
        }}
      >
        {children}
      </Col>
    );
  }
}

export default Square;
