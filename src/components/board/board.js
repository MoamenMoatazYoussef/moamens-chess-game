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
    const x1 = Number(oldPosition.substr(1));
    const y1 = Number(oldPosition.substr(0, 1));

    const x2 = Number(newPosition.substr(1));
    const y2 = Number(newPosition.substr(0, 1));

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
        const x1 = Number(oldPosition.substr(1));
        const y1 = Number(oldPosition.substr(0, 1));

        const x2 = Number(newPosition.substr(1));
        const y2 = Number(newPosition.substr(0, 1));

        let noOfSquares = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
        let thetaDegrees = this.getAngleInDegrees(x1, y1, x2, y2);

        const path = this.getPath(x1, y1, noOfSquares, thetaDegrees);
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

  highlightPaths(x1, y1, pieceLimit) {
    let possibleSquares = [];
    let possibleThetas = [0, 45, 90, 135, 180];
    for(let i = 0 ; i < possibleThetas.length ; i++) {
      possibleSquares = [
        ...possibleSquares,
        ...this.getPath(x1, y1, pieceLimit, possibleThetas[i])
      ];
    }
    this.setState({
      possibleSquares,
    });
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

    debugger;

    do {
      x = x1 + i * xIncrease;
      y = y1 + i * yIncrease;

      if (pieces.has(`${y}${x}`)) { //TODO: Implement checkSquare and replace checks in checkPath because it's used at Knight
        if (pieces.get(`${y}${x}`).color !== pieces.get(`${y1}${x1}`).color) {
          path.push(`${y}${x}`);
        }
        break;
      }
      path.push(`${y}${x}`);
      i++;
      
      boundaryCondition = x >= 0 && x <= 7 && y >= 0 && y <= 7;
      limitCondition = i <= limit;
      
    } while  (boundaryCondition && limitCondition);
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
                const position = `${y}${x}`;
                const highlighted = possibleSquares.includes(position)
                  ? '1px solid red'
                  : '';
                return (
                  <Square
                    key={position}
                    position={position}
                    backgroundColor={color}
                    onSquareClick={this.onSquareClick}
                    highlighted={highlighted}
                  >
                    <span>{position}</span>
                    {pieces.has(position) ? (
                      <Piece
                        src={pieces.get(position).src}
                        name={pieces.get(position).name}
                        color={pieces.get(position).color}
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
