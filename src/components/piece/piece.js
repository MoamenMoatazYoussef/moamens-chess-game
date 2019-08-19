import React, { Component } from 'react';

class Piece extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      color: this.props.color,
      position: this.props.position
    }

    this.checkMove = this.checkMove.bind(this);
  }

  checkMove() {
    return true;
  }

  render() {
    const { src } = this.props;
    return (
      <img src={src} alt="" />
    );
  }
}


class Pawn extends Piece {
  constructor(props) {
    super(props);

    this.setState({
      direction: (this.state.color === 'white' ? 1 : -1),
      firstMoveIndicator: true
    });
  }

  checkMove(newPosition) {
    const { position, direction, firstMoveIndicator } = this.state;

    const x1 = position.x;
    const y1 = position.y;

    const x2 = newPosition.x
    const y2 = newPosition.y

    const normalMove = x2 - x1 === (1 * direction) && y1 - y2 === 0;
    const firstMove = x2 - x1 === (2 * direction) && y1 - y2 === 0 && firstMoveIndicator;
    const captureMove = Math.abs(y1 - y2) === Math.abs(x1 - x2) && x2 - x1 === (1 * direction);

    if(normalMove || firstMove || captureMove) {
      this.setState({
        firstMoveIndicator: (firstMove ? false : true),
        position: newPosition
      });

      return true;
    }
    return false;
  }
}

/**
 * 
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
 */


export default Piece;