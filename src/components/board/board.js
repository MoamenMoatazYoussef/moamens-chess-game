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

      pieces.set(`0${i}`, {
        name: pieceTypes[i],
        color: "black",
        x: 0,
        y: i,
        src: blackPieceSources[pieceTypes[i]]
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
    const y1 = Number(oldPosition.substr(0, 1));
    const x1 = Number(oldPosition.substr(1));

    const y2 = Number(newPosition.substr(0, 1));
    const x2 = Number(newPosition.substr(1));

    const pawnCondition = ((Math.abs(y1 - y2) === 1) && (x1 - x2 === 0));;
    const rookCondition = ((y1 - y2 === 0) || (x1 - x2 === 0));
    const knightCondition = () => { //TODO: this condition is not working
      const xSquared = (x2 - x1) ** 2;
      const ySquared = (y2 - y1) ** 2;
      return ((xSquared + ySquared === 5));
    };
    const bishopCondition = (Math.abs(y1 - y2) === Math.abs(x1 - x2));
    const queenCondition = rookCondition || bishopCondition;
    const kingCondition = queenCondition && ((Math.abs(y1 - y2) === 1) || (Math.abs(x1 - x2) === 1));

    switch (pieceName) { //TODO: a better way than using names e.g. symbols or whatever
      case 'pawn':
        return pawnCondition;
      case 'rook':
        return rookCondition;
      case 'knight':
        return knightCondition;
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
    if (oldPosition === newPosition) {
      //throw error: destination must be different from starting point
      return false;
    }


    switch (pieceName) { //TODO: implement checkPath
      case 'P':
        return true;
      case 'R':
        return true;
      case 'N':
        return true; //this will remain true
      case 'B':
        return true;
      case 'Q':
        return true;
      case 'K':
        return true;
      default:
        return true;
    }
  }

  onSquareClick(squarePosition) {
    const position = squarePosition;
    const { pieces, selectedPiece, oldPosition } = this.state;

    console.log(selectedPiece);

    if (selectedPiece) { //selecting destination
      const legalMove = this.checkMove(selectedPiece.name, oldPosition, position);
      const clearPath = this.checkPath(selectedPiece.name, oldPosition, position);
      if (!legalMove) {
        //throw error: illegal move for ${selectedPiece.name}.
        console.log('legal move error');
      } else if (!clearPath) {
        console.log('clear path error');
        //throw error: path is not clear for ${selectedPiece.name}
      } else {
        pieces.set(position, selectedPiece);
        pieces.delete(oldPosition);
      }
    }
    else if (pieces.has(position)) //first click on square with piece (selecting source)
    {
      console.log(':(');
      this.setState({
        oldPosition: position,
        selectedPiece: pieces.get(position)
      });
      return;
    } else { //clicking on empty square and there is no selected piece
      console.log(':( 2');
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
