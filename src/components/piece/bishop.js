import Piece from './piece.js';

class Bishop extends Piece {
    checkMove(newPosition) {
        const {
            position
        } = this.state;

        const x1 = position.x;
        const y1 = position.y;

        const x2 = newPosition.x
        const y2 = newPosition.y

        const bishopCondition =
            Math.abs(y1 - y2) === Math.abs(x1 - x2);

        return bishopCondition;
    }
}

export default Bishop;