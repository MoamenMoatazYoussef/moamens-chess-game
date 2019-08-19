import Piece from './piece.js';

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

  export default Pawn;
  
