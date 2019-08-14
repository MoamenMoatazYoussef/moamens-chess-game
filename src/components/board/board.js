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

    this.checkMove = this.checkMove.bind(this);
    this.checkPath = this.checkPath.bind(this);

    this.getAngleInDegrees = this.getAngleInDegrees.bind(this);
  }

  // <<<<<<<<<<<<<<<<<<<< class methods >>>>>>>>>>>>>>>>>>>>

  initBoardColors() {
    const squareColorIndicator = [];
    let c = false;

    // debugger;

    for (let i = ROW_COUNT - 1; i >= 0; i--) {
      let x = [
        {
          id: 0,
          color: c
        }
      ];
      for (let j = COL_COUNT; j > 1; j--) {
        x.push({
          id: COL_COUNT - j + 1,
          color: !x[COL_COUNT - j].color
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

    const pieceTypes = [
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

      pieces.set(`${i}0`, {
        name: pieceTypes[i],
        color: "black",
        x: 0,
        y: i,
        src: blackPieceSources[pieceTypes[i]]
      });

      pieces.set(`${i}1`, {
        name: "pawn",
        color: "black",
        x: 1,
        y: i,
        src: blackPawn
      });

      pieces.set(`${i}6`, {
        name: "pawn",
        color: "white",
        x: 6,
        y: i,
        src: whitePawn
      });

      pieces.set(`${i}7`, {
        name: pieceTypes[i],
        color: "white",
        x: 7,
        y: i,
        src: whitePieceSources[pieceTypes[i]]
      });
    }

    return pieces;
  }

  // <<<<<<<<<<<<<<<<<<<< lifecycle methods >>>>>>>>>>>>>>>>>>>>

  componentDidMount() {
    this.initBoardPieces();
    this.initBoardColors();
  }

  checkMove(pieceName, oldPosition, newPosition) {
    const x1 = Number(oldPosition.substr(1));
    const y1 = Number(oldPosition.substr(0, 1));

    const x2 = Number(newPosition.substr(1));
    const y2 = Number(newPosition.substr(0, 1));

    const pawnCondition = ((Math.abs(x1 - x2) === 1) && (y1 - y2 === 0));
    const rookCondition = ((y1 - y2 === 0) || (x1 - x2 === 0));
    const bishopCondition = (Math.abs(y1 - y2) === Math.abs(x1 - x2));
    const queenCondition = rookCondition || bishopCondition;
    const kingCondition = queenCondition && ((Math.abs(y1 - y2) === 1) || (Math.abs(x1 - x2) === 1));

    const knightCondition = () => {
      const xSquared = (x2 - x1) ** 2;
      const ySquared = (y2 - y1) ** 2;
      return ((xSquared + ySquared === 5));
    };

    switch (pieceName) { //TODO: a better way than using names e.g. symbols or whatever
      case 'pawn':
        return pawnCondition;
      case 'rook':
        return rookCondition;
      case 'knight':
        return knightCondition();
      case 'bishop':
        return bishopCondition;
      case 'queen':
        return queenCondition;
      case 'king':
        return kingCondition;
      default:
        return false;
    }
  }

  checkPath(pieceName, oldPosition, newPosition) {
    const y1 = Number(oldPosition.substr(1));
    const x1 = Number(oldPosition.substr(0, 1));

    const y2 = Number(newPosition.substr(1));
    const x2 = Number(newPosition.substr(0, 1));

    const { pieces } = this.state;
    if (oldPosition === newPosition) {
      //throw error: destination must be different from starting point
      return false;
    }

    switch (pieceName) { //TODO: implement checkPath
      case 'pawn':
      case 'rook':
      case 'bishop':
      case 'queen':
      case 'king':
        let noOfSquares = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));

        let thetaDegrees = this.getAngleInDegrees(x1, y1, x2, y2);
        let theta = (Math.PI / 180) * thetaDegrees;

        let yIncrease = Math.round(Math.cos(theta));
        let xIncrease = Math.round(Math.sin(theta));

        for (let i = 1; i <= noOfSquares; i++) {
          let x = (x1 + i * xIncrease);
          let y = (y1 + i * yIncrease);
          let square = `${y}${x}`;

          debugger;

          if (pieces.has(square))
            // alert(`Path is not clear for ${pieceName} at position ${square}`);
            return false;
        }
        return true;
      case 'knight':
        return true;
      default:
        return false;
    }
  }

  getAngleInDegrees(x1, y1, x2, y2) {
    let thetaRad = Math.atan((y2 - y1) / (x2 - x1));
    let thetaDegrees = thetaRad * (180 / Math.PI);
    if (y2 >= y1 && x2 < x1) {
      thetaDegrees += 180;
    }
    if (x2 >= x1 && y2 < y1) {
      thetaDegrees += 360;
    }
    return thetaDegrees;
  }

  onSquareClick(squarePosition) {
    const position = squarePosition;
    const { pieces, selectedPiece, oldPosition } = this.state;

    if (selectedPiece) { //selecting destination
      const legalMove = this.checkMove(selectedPiece.name, oldPosition, position);
      const clearPath = this.checkPath(selectedPiece.name, oldPosition, position);
      if (!legalMove) {
        alert(`Illegal move for ${selectedPiece.name}.`);
      } else if (!clearPath) {
        alert(`Path is not clear for ${selectedPiece.name}`);
      } else {
        pieces.set(position, selectedPiece);
        pieces.delete(oldPosition);
      }
    }

    else if (pieces.has(position)) //first click on square with piece (selecting source)
    {
      this.setState({
        oldPosition: position,
        selectedPiece: pieces.get(position)
      });
      return;
    } else {
      return;
    }

    this.setState({
      oldPosition: null,
      selectedPiece: null
    });
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
                  const y = squareWrapper.id;
                  const x = rowObject.id
                  const position = `${y}${x}`;
                  return (
                    <Square key={position} position={position} backgroundColor={color} onSquareClick={this.onSquareClick}>
                      <span>{position}</span>
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
