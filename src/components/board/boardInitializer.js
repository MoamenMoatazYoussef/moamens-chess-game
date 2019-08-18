import whitePawn from "../../resources/pieces/white/pawn.png"; //TODO: improve this..
import whiteRook from "../../resources/pieces/white/rook.png";
import whiteKnight from "../../resources/pieces/white/knight.png";
import whiteBishop from "../../resources/pieces/white/bishop.png";
import whiteQueen from "../../resources/pieces/white/queen.png";
import whiteKing from "../../resources/pieces/white/king.png";

import blackPawn from "../../resources/pieces/black/pawn.png";
import blackRook from "../../resources/pieces/black/rook.png";
import blackKnight from "../../resources/pieces/black/knight.png";
import blackBishop from "../../resources/pieces/black/bishop.png";
import blackQueen from "../../resources/pieces/black/queen.png";
import blackKing from "../../resources/pieces/black/king.png";

import {
    ROW_COUNT,
    COL_COUNT
} from "../../constants/constants.js";

const whitePieceSources = {
    pawn: whitePawn,
    rook: whiteRook,
    knight: whiteKnight,
    bishop: whiteBishop,
    queen: whiteQueen,
    king: whiteKing
};

const blackPieceSources = {
    pawn: blackPawn,
    rook: blackRook,
    knight: blackKnight,
    bishop: blackBishop,
    queen: blackQueen,
    king: blackKing
};

class BoardInitializer {
    initBoardColors() {
        const squareColorIndicator = [];
        let c = false;

        for (let i = ROW_COUNT - 1; i >= 0; i--) {
            let x = [{
                id: 0,
                color: c
            }];
            for (let j = COL_COUNT; j > 1; j--) {
                x.push({
                    id: COL_COUNT - j + 1,
                    color: !x[COL_COUNT - j].color
                });
            }
            squareColorIndicator.push({
                id: i,
                row: x
            });
            c = !c;
        }

        return squareColorIndicator;
    }

    initBoardPieces() { //TODO: Needs improvement in loop
        let pieces = new Map();

        const pieceTypes = [
            "rook",
            "knight",
            "bishop",
            "queen",
            "king",
            "bishop",
            "knight",
            "rook"
        ];

        for (let i = 0; i < COL_COUNT; i++) {

            pieces.set(`${i}0`, {
                name: pieceTypes[i],
                color: "white",
                x: 0,
                y: i,
                src: whitePieceSources[pieceTypes[i]]
            });

            pieces.set(`${i}1`, {
                name: "pawn",
                color: "white",
                x: 1,
                y: i,
                src: whitePawn
            });

            pieces.set(`${i}6`, {
                name: "pawn",
                color: "black",
                x: 6,
                y: i,
                src: blackPawn
            });

            pieces.set(`${i}7`, {
                name: pieceTypes[i],
                color: "black",
                x: 7,
                y: i,
                src: blackPieceSources[pieceTypes[i]]
            });
        }

        return pieces;
    }
}

export default BoardInitializer;