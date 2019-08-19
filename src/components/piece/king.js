import Piece from './piece.js';

class King extends Piece {
    checkMove(newPosition) {
        const {
            position
        } = this.state;

        const x1 = position.x;
        const y1 = position.y;

        const x2 = newPosition.x
        const y2 = newPosition.y

        const kingCondition =
            (y1 - y2 === 0 || x1 - x2 === 0 || Math.abs(y1 - y2) === Math.abs(x1 - x2)) &&
            (Math.abs(y1 - y2) === 1 || Math.abs(x1 - x2) === 1);

        return kingCondition;
    }
}

export default King;