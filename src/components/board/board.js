import React, { Component } from "react";
import { Row, Container } from "react-bootstrap";

import BoardInitializer from "./boardInitializer.js";

import Square from "../square/square.js";
import Piece from "../piece/piece.js";
import "./board.css";

import {
  lightSquareColor,
  darkSquareColor
} from "../../constants/constants.js";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pieces: new Map(),
      boardColors: [],

      oldPosition: null,
      selectedPiece: null,

      boardInitializer: new BoardInitializer()
    };

    this.onSquareClick = this.onSquareClick.bind(this);

    this.checkMove = this.checkMove.bind(this);
    this.checkPath = this.checkPath.bind(this);

    this.getAngleInDegrees = this.getAngleInDegrees.bind(this);
    this.getPath = this.getPath.bind(this);
  }

  // <<<<<<<<<<<<<<<<<<<< class methods >>>>>>>>>>>>>>>>>>>>

  checkMove(pieceName, oldPosition, newPosition) {
    const x1 = Number(oldPosition.substr(1));
    const y1 = Number(oldPosition.substr(0, 1));

    const x2 = Number(newPosition.substr(1));
    const y2 = Number(newPosition.substr(0, 1));

    const pawnCondition = Math.abs(x1 - x2) === 1 && y1 - y2 === 0;
    const rookCondition = y1 - y2 === 0 || x1 - x2 === 0;
    const bishopCondition = Math.abs(y1 - y2) === Math.abs(x1 - x2);
    const queenCondition = rookCondition || bishopCondition;
    const kingCondition =
      queenCondition && (Math.abs(y1 - y2) === 1 || Math.abs(x1 - x2) === 1);

    const knightCondition = () => {
      const xSquared = (x2 - x1) ** 2;
      const ySquared = (y2 - y1) ** 2;
      return xSquared + ySquared === 5;
    };

    switch (
      pieceName //TODO: a better way than using names e.g. symbols or whatever
    ) {
      case "pawn":
        return pawnCondition;
      case "rook":
        return rookCondition;
      case "knight":
        return knightCondition();
      case "bishop":
        return bishopCondition;
      case "queen":
        return queenCondition;
      case "king":
        return kingCondition;
      default:
        return false;
    }
  }

  checkPath(pieceName, oldPosition, newPosition) {
    const { pieces } = this.state;

    if (oldPosition === newPosition) {
      //throw error: destination must be different from starting point
      return false;
    }

    switch (
      pieceName //TODO: implement checkPath
    ) {
      case "pawn":
      case "rook":
      case "bishop":
      case "queen":
      case "king":
        const path = this.getPath(oldPosition, newPosition, pieces);
        if (path[path.length - 1] === newPosition) {
          return true;
        }
        return false;
      case "knight":
        if (pieces.has(newPosition)) {
          if (pieces.get(newPosition).color === pieces.get(oldPosition).color) {
            return false;
          }
          return true;
        }
        return true;
      default:
        return false;
    }
  }

  highlightPaths(oldPosition) {
    
  }

  getPath(oldPosition, newPosition, pieces) {
    const x1 = Number(oldPosition.substr(1));
    const y1 = Number(oldPosition.substr(0, 1));

    const x2 = Number(newPosition.substr(1));
    const y2 = Number(newPosition.substr(0, 1));
    
    let noOfSquares = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
    let thetaDegrees = this.getAngleInDegrees(x1, y1, x2, y2);
    let thetaRad = (Math.PI / 180) * thetaDegrees;

    let path = [];

    let xIncrease = Math.round(Math.cos(thetaRad));
    let yIncrease = Math.round(Math.sin(thetaRad));

    debugger;

    for (let i = 1; i <= noOfSquares; i++) {
      let x = x1 + i * xIncrease;
      let y = y1 + i * yIncrease;
      let square = `${y}${x}`;

      if (pieces.has(square)) {
        if (pieces.get(square).color !== pieces.get(oldPosition).color) {
          path.push(square);
        }
        return path;
      }
      path.push(square);
    }
    return path;
  }

  checkSquare(pieces, square, oldPosition) { //TODO: Implement this and replace checks in checkPath
    if (pieces.has(square)) {
      //then stop but look at this
      return pieces.get(square).color === pieces.get(oldPosition).color; //if true, bad, if false, good
    }
    return false; //if false, good
  }

  getAngleInDegrees(x1, y1, x2, y2) {
    let thetaRad = Math.atan((y2 - y1) / (x2 - x1));
    let thetaDegrees = thetaRad * (180 / Math.PI);
    if (x2 < x1) {
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

    if (selectedPiece) {
      //selecting destination
      const legalMove = this.checkMove(
        selectedPiece.name,
        oldPosition,
        position
      );
      const clearPath = this.checkPath(
        selectedPiece.name,
        oldPosition,
        position
      );
      if (!legalMove) {
        alert(`Illegal move for ${selectedPiece.name}.`);
      } else if (!clearPath) {
        alert(`Path is not clear for ${selectedPiece.name}`);
      } else {
        pieces.set(position, selectedPiece);
        pieces.delete(oldPosition);
      }
    } else if (pieces.has(position)) {
      //first click on square with piece (selecting source)
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

  // <<<<<<<<<<<<<<<<<<<< lifecycle methods >>>>>>>>>>>>>>>>>>>>

  componentDidMount() {
    const initializer = this.state.boardInitializer;
    const pieces = initializer.initBoardPieces();
    const colors = initializer.initBoardColors();
    this.setState({
      boardColors: colors,
      pieces: pieces
    });
  }

  render() {
    const { boardColors, pieces } = this.state;

    return (
      <Container className="Board">
        {boardColors.map(rowObject => {
          return (
            <Row key={rowObject.id}>
              {rowObject.row.map(squareWrapper => {
                const color = squareWrapper.color
                  ? darkSquareColor
                  : lightSquareColor;
                const y = squareWrapper.id;
                const x = rowObject.id;
                const position = `${y}${x}`;
                return (
                  <Square
                    key={position}
                    position={position}
                    backgroundColor={color}
                    onSquareClick={this.onSquareClick}
                  >
                    <span>{position}</span>
                    {pieces.has(position) ? (
                      <Piece src={pieces.get(position).src} />
                    ) : null}
                  </Square>
                );
              })}
            </Row>
          );
        })}
      </Container>
    );
  }
}

export default Board;
