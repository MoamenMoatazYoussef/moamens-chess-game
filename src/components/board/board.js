import React, { Component } from "react";
import { Row, Container } from "react-bootstrap";

import Square from "../square/square.js";
import Piece from "../piece/piece.js";
import "./board.css";

import {
  lightSquareColor,
  darkSquareColor,
  ROW_COUNT,
  COL_COUNT
} from "../../constants/constants.js";

import whitePawn from "../../resources/pieces/white/pawn.png"; //TODO: improve this..
import whiteRook from "../../resources/pieces/white/rook.png";
import whiteKnight from "../../resources/pieces/white/knight.png";
import whiteBishop from "../../resources/pieces/white/bishop.png";
import whiteQueen from "../../resources/pieces/white/queen.png";
import whiteKing from "../../resources/pieces/white/king.png";

import blackPawn from "../../resources/pieces/black/pawn.png";
import blackRook from "../../resources/pieces/black/rook.png";
import blackKnight from "../../resources/pieces/black/knight.png";
import blackBishop from "../../resources/pieces/black/bishop.png";
import blackQueen from "../../resources/pieces/black/queen.png";
import blackKing from "../../resources/pieces/black/king.png";

const whitePieceSources = {
  pawn: whitePawn,
  rook: whiteRook,
  knight: whiteKnight,
  bishop: whiteBishop,
  queen: whiteQueen,
  king: whiteKing
};

const blackPieceSources = {
  pawn: blackPawn,
  rook: blackRook,
  knight: blackKnight,
  bishop: blackBishop,
  queen: blackQueen,
  king: blackKing
};

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pieces: new Map(),
      boardColors: [],

      oldPosition: null,
      selectedPiece: null
    };

    this.initBoardColors = this.initBoardColors.bind(this);
    this.initBoardPieces = this.initBoardPieces.bind(this);
    this.onSquareClick = this.onSquareClick.bind(this);
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

    const pieces = this.initBoardPieces();

    this.setState({
      boardColors: squareColorIndicator,
      pieces: pieces
    });
  }

  initBoardPieces() { //TODO: Needs improvement in loop
    let pieces = new Map();

    const mainPieceNames = [
      "rook",
      "knight",
      "bishop",
      "queen",
      "king",
      "bishop",
      "knight",
      "rook"
    ];

    for (let i = 0; i < COL_COUNT; i++) {

      pieces.set(`0${i}`, {
        name: mainPieceNames[i],
        color: "black",
        x: 0,
        y: i,
        src: blackPieceSources[mainPieceNames[i]]
      });

      pieces.set(`1${i}`, {
        name: "pawn",
        color: "black",
        x: 1,
        y: i,
        src: blackPawn
      });

      pieces.set(`6${i}`, {
        name: "pawn",
        color: "white",
        x: 6,
        y: i,
        src: whitePawn
      });

      pieces.set(`7${i}`, {
        name: mainPieceNames[i],
        color: "white",
        x: 7,
        y: i,
        src: whitePieceSources[mainPieceNames[i]]
      });
    }

    return pieces;
  }

  // <<<<<<<<<<<<<<<<<<<< lifecycle methods >>>>>>>>>>>>>>>>>>>>

  componentDidMount() {
    this.initBoardPieces();
    this.initBoardColors();
  }

  onSquareClick(squarePosition) {
    const position = squarePosition;
    const { pieces, selectedPiece, oldPosition } = this.state;

    if (selectedPiece) {
      pieces.set(position, selectedPiece);
      pieces.delete(oldPosition);
      this.setState({
        oldPosition: null,
        selectedPiece: null
      });
      return;
    }

    if (pieces.has(position)) {
      this.setState({
        oldPosition: position,
        selectedPiece: pieces.get(position)
      })
    }
  }

  render() {
    const { boardColors, pieces } = this.state;

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
                  const position = `${rowObject.id}${squareWrapper.id}`;
                  return (
                    <Square key={position} position={position} backgroundColor={color} onSquareClick={this.onSquareClick}>
                      {pieces.has(position) ? (
                        <Piece
                          src={pieces.get(position).src}
                        />
                      ) : null}
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
