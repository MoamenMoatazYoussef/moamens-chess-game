import Piece from './piece.js';

class Queen extends Piece {
    checkMove(newPosition) {
        const {
            position
        } = this.state;

        const x1 = position.x;
        const y1 = position.y;

        const x2 = newPosition.x
        const y2 = newPosition.y

        const queenCondition =
            y1 - y2 === 0 || x1 - x2 === 0 || Math.abs(y1 - y2) === Math.abs(x1 - x2);

        return queenCondition;
    }
}

export default Queen;