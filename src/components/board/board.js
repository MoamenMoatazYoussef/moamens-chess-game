import React, { Component } from 'react';
import './board.css';

import { Row, Container } from 'react-bootstrap';
import Square from './square.js';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: null
    };

    this.initBoard = this.initBoard.bind(this);
  }

  initBoard() {

  }

  render() {
    return (
      <div className="Board" >
        <Container>
          <Row>
            <Col sm="1"></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Board;
