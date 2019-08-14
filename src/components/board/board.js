import React, { Component } from "react";
import { Row, Container } from "react-bootstrap";

import Square from "../square/square.js";
import Piece from "../piece/piece.js";
import "./board.css";

// import {
//   whitePawn,
//   whiteRook,
//   whiteKnight,
//   whiteBishop,
//   whiteQueen,
//   whiteKing,
//   blackPawn,
//   blackRook,
//   blackKnight,
//   blackBishop,
//   blackQueen,
//   blackKing
// } from '../piece/piece-images.js';

import {
  lightSquareColor,
  darkSquareColor,
  ROW_COUNT,
  COL_COUNT
} from "../../constants/constants.js";

import whitePawn from "../../resources/pieces/white/pawn.png";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pieces: [],
      boardColors: []
    };

    this.initBoardColors = this.initBoardColors.bind(this);
  }

  // <<<<<<<<<<<<<<<<<<<< class methods >>>>>>>>>>>>>>>>>>>>

  initBoardColors() {
    const squareColorIndicator = [];
    let c = false;
    for (let i = 0; i < ROW_COUNT; i++) {
      let x = [
        {
          id: 0,
          color: c
        }
      ];
      for (let j = 1; j < COL_COUNT; j++) {
        x.push({
          id: j,
          color: !x[j - 1].color
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
      <div className="Board">
        <Container>
          {boardColors.map(rowObject => {
            return (
              <Row key={rowObject.id}>
                {rowObject.row.map(squareWrapper => {
                  const color = squareWrapper.color
                    ? darkSquareColor
                    : lightSquareColor;
                  const id = `${rowObject.id}${squareWrapper.id}`;
                  return (
                    <Square key={id} backgroundColor={color}>
                      <Piece
                        name="pawn"
                        color="white"
                        x={rowObject.id}
                        y={squareWrapper.id}
                        src={whitePawn}
                      />
                    </Square>
                  );
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
