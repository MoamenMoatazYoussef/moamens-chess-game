import React, { Component } from 'react';
import { Row, Container } from 'react-bootstrap';

import Square from './square.js';
import './board.css';

import {
  lightSquareColor,
  darkSquareColor,
  ROW_COUNT,
  COL_COUNT
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

  // <<<<<<<<<<<<<<<<<<<< class methods >>>>>>>>>>>>>>>>>>>>

  initBoardColors() {
    const squareColorIndicator = [];
    let c = false;
    for (let i = 0; i < ROW_COUNT; i++) {
      let x = [{
        id: 0,
        color: c
      }];
      for (let j = 1; j < COL_COUNT; j++) {
        x.push({
          id: j,
          color: !x[j-1].color
        });
      }
      squareColorIndicator.push({
        id: i,
        row: x
      });
      c = !c;
    }

    this.setState({
      boardColors: squareColorIndicator
    });
  }

  // <<<<<<<<<<<<<<<<<<<< lifecycle methods >>>>>>>>>>>>>>>>>>>>

  componentDidMount() {
    this.initBoardColors();
  }

  render() {
    const boardColors = this.state.boardColors;

    return (
      <div className="Board" >
        <Container>
          {boardColors.map(rowObject => {
            return (
              <Row key={rowObject.id}>
                {rowObject.row.map(squareWrapper => {
                  const color = squareWrapper.color ? darkSquareColor : lightSquareColor;
                  const id = `${squareWrapper.id}${rowObject.id}`
                  return <Square key={id} backgroundColor={color}>{id}</Square> ;
                })}
              </Row>
            );
          })}
        </Container>
      </div>
    );
  }
}

export default Board;
