import React, { Component } from 'react';
import './board.css';
import { Row, Col, Container } from 'react-bootstrap';

import Square from './square.js';
import {
  lightSquareColor,
  darkSquareColor,
  SQUARES_COUNT,
  SQUARES_COUNT_PLUS_TRANSITIONS
} from '../../constants/constants.js';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      boardColors: []
    };

    this.initBoardColors = this.initBoardColors.bind(this);
  }

  initBoardColors() {

  }

  componentDidMount() {
    const squareColorIndicator = [];
    let c = false;
    for (let i = 0; i < 64; i += 4) {
      squareColorIndicator[i] = {
        id: i,
        darkColor: c
      };
      c = !c;
      for (let j = 1 + i; j < 4 + i; j++) {
        squareColorIndicator[j] = {
          id: j,
          darkColor: !squareColorIndicator[j - 1].darkColor
        };
      }
    }
    console.log(squareColorIndicator);

    this.setState({
      boardColors: squareColorIndicator
    });
  }

  render() {
    const leftBoardColors = this.state.boardColors.slice(
      0, (this.state.boardColors.length / 2));
    const rightBoardColors = this.state.boardColors.slice(
      (this.state.boardColors.length / 2), this.state.boardColors.length + 1);

    console.log(this.state.boardColors);
    return (
      <div className="Board" >
        <Container>
          <Row>
            <Col sm={6}>
              <Row>
                {leftBoardColors.map((item) => {
                  const color = item.darkColor ? darkSquareColor : lightSquareColor;
                  return <Square key={item.id} backgroundColor={color}></Square>;
                })}
              </Row>
            </Col>

            <Col sm={6}>
              <Row>
                {rightBoardColors.map((item) => {
                  const color = item.darkColor ? darkSquareColor : lightSquareColor;
                  return <Square key={item.id} backgroundColor={color}></Square>;
                })}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Board;
