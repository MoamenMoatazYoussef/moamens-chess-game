import Piece from './piece.js';

class Knight extends Piece {
  checkMove(newPosition) {
    const {
      position
    } = this.state;

    const x1 = position.x;
    const y1 = position.y;

    const x2 = newPosition.x
    const y2 = newPosition.y

    const knightCondition = (x1, y1, x2, y2) => {
      const xSquared = (x2 - x1) ** 2;
      const ySquared = (y2 - y1) ** 2;
      return xSquared + ySquared === 5;
    };

    return knightCondition(x1, y1, x2, y2);
  }
}

export default Knight;