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
      possibleSquares: [],

      boardInitializer: new BoardInitializer()
    };

    this.onSquareClick = this.onSquareClick.bind(this);

    this.checkMove = this.checkMove.bind(this);
    this.checkPath = this.checkPath.bind(this);
    this.highlightPaths = this.highlightPaths.bind(this);

    this.getAngleInDegrees = this.getAngleInDegrees.bind(this);
    this.getPath = this.getPath.bind(this);
    this.getChangeInXandY = this.getChangeInXandY.bind(this);
  }

  // <<<<<<<<<<<<<<<<<<<< class methods >>>>>>>>>>>>>>>>>>>>

  checkMove(pieceName, oldPosition, newPosition) {
    const x1 = oldPosition.x;
    const y1 = oldPosition.y;

    const x2 = newPosition.x;
    const y2 = newPosition.y;

    const pawnCondition = (x1, y1, x2, y2) =>
      Math.abs(x1 - x2) === 1 && y1 - y2 === 0;
    const rookCondition = (x1, y1, x2, y2) => y1 - y2 === 0 || x1 - x2 === 0;
    const bishopCondition = (x1, y1, x2, y2) =>
      Math.abs(y1 - y2) === Math.abs(x1 - x2);
    const queenCondition = (x1, y1, x2, y2) =>
      rookCondition(x1, y1, x2, y2) || bishopCondition(x1, y1, x2, y2);
    const kingCondition = (x1, y1, x2, y2) =>
      queenCondition(x1, y1, x2, y2) &&
      (Math.abs(y1 - y2) === 1 || Math.abs(x1 - x2) === 1);

    const knightCondition = (x1, y1, x2, y2) => {
      const xSquared = (x2 - x1) ** 2;
      const ySquared = (y2 - y1) ** 2;
      return xSquared + ySquared === 5;
    };

    switch (
    pieceName //TODO: a better way than using names e.g. symbols or whatever
    ) {
      case "pawn":
        return pawnCondition(x1, y1, x2, y2);
      case "rook":
        return rookCondition(x1, y1, x2, y2);
      case "knight":
        return knightCondition(x1, y1, x2, y2);
      case "bishop":
        return bishopCondition(x1, y1, x2, y2);
      case "queen":
        return queenCondition(x1, y1, x2, y2);
      case "king":
        return kingCondition(x1, y1, x2, y2);
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

    switch (pieceName) {
      case "pawn":
      case "rook":
      case "bishop":
      case "queen":
      case "king":
        const x1 = oldPosition.x;
        const y1 = oldPosition.y;

        const x2 = newPosition.x;
        const y2 = newPosition.y;

        let noOfSquares = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
        let thetaDegrees = this.getAngleInDegrees(x1, y1, x2, y2);

        const path = this.getPath(x1, y1, noOfSquares, thetaDegrees);
        if (path[path.length - 1] === newPosition.stringFormat) {
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

  highlightPaths(oldPosition, pieceName, pieceColor) {
    const x1 = oldPosition.x;
    const y1 = oldPosition.y;
    let pieceLimit = 99; //TODO: bad code, this should be changed
    let possibleThetas;

    let blackAngleOffset = pieceColor === "black" ? 180 : 0;

    switch (pieceName) {
      case "pawn":
        pieceLimit = 1;
        possibleThetas = [0 + blackAngleOffset];
        break;
      case "rook":
        possibleThetas = [0, 90, 180, 270];
        break;
      case "bishop":
        possibleThetas = [45, 135, 225, 315];
        break;
      case "queen":
        possibleThetas = [0, 45, 90, 135, 180, 225, 270, 315];
        break;
      case "king":
        possibleThetas = [0, 45, 90, 135, 180, 225, 270, 315];
        pieceLimit = 1;
        break;
      case "knight":
        break;
      default:
        break;
    }

    let possibleSquares = [];

    for (let i = 0; i < possibleThetas.length; i++) {
      possibleSquares = [
        ...possibleSquares,
        ...this.getPath(x1, y1, pieceLimit, possibleThetas[i])
      ];
    }

    return possibleSquares;
  }

  getPath(x1, y1, limit, thetaDegrees) {
    const { pieces } = this.state;
    const { xIncrease, yIncrease } = this.getChangeInXandY(thetaDegrees);

    let path = [];
    let x,
      y,
      i = 1;

    let boundaryCondition = x >= 0 && x <= 7 && y >= 0 && y <= 7;
    let limitCondition = i <= limit;

    do {
      x = x1 + i * xIncrease;
      y = y1 + i * yIncrease;

      if (pieces.has(`${y}${x}`)) {
        //TODO: Implement checkSquare and replace checks in checkPath because it's used at Knight
        if (pieces.get(`${y}${x}`).color !== pieces.get(`${y1}${x1}`).color) {
          path.push(`${y}${x}`);
        }
        break;
      }
      path.push(`${y}${x}`);
      i++;

      boundaryCondition = x >= 0 && x <= 7 && y >= 0 && y <= 7;
      limitCondition = i <= limit;
    } while (boundaryCondition && limitCondition);
    return path;
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

  getChangeInXandY(thetaDegrees) {
    let thetaRad = (Math.PI / 180) * thetaDegrees;

    return {
      xIncrease: Math.round(Math.cos(thetaRad)),
      yIncrease: Math.round(Math.sin(thetaRad))
    };
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
        pieces.set(position.stringFormat, selectedPiece);
        pieces.delete(oldPosition.stringFormat);
      }
      this.setState({
        possibleSquares: []
      });
    } else if (pieces.has(position.stringFormat)) {
      //first click on square with piece (selecting source)
      let possibleSquares = this.highlightPaths(
        position,
        pieces.get(position.stringFormat).name,
        pieces.get(position.stringFormat).color
      );
      this.setState({
        oldPosition: position,
        selectedPiece: pieces.get(position.stringFormat),
        possibleSquares
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
    const { boardColors, pieces, possibleSquares } = this.state;

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
                const position = {
                  x: x,
                  y: y,
                  stringFormat: `${y}${x}`
                };
                const highlighted = possibleSquares.includes(position.stringFormat)
                  ? "1px solid red"
                  : "";
                return (
                  <Square
                    key={position.stringFormat}

                    position={position}
                    onSquareClick={this.onSquareClick}

                    backgroundColor={color}
                    className={highlighted}
                    highlighted={highlighted}
                  >
                    <span>{position.stringFormat}</span>
                    {pieces.has(position.stringFormat) ? (
                      <Piece
                        src={pieces.get(position.stringFormat).src}
                        name={pieces.get(position.stringFormat).name}
                        color={pieces.get(position.stringFormat).color}
                      />
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
