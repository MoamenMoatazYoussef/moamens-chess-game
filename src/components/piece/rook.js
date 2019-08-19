import Piece from './piece.js';

class Rook extends Piece {
    checkMove(newPosition) {
      const { position } = this.state;
  
      const x1 = position.x;
      const y1 = position.y;
  
      const x2 = newPosition.x
      const y2 = newPosition.y
  
      const rookCondition = y1 - y2 === 0 || x1 - x2 === 0;
      return rookCondition;
    }
  }
  
export default Rook;