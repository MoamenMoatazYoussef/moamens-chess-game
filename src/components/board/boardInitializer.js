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

import Pawn from '../piece/pawn.js';
import Rook from '../piece/rook.js';
import Knight from '../piece/knight.js';
import Bishop from '../piece/bishop.js';
import Queen from '../piece/queen.js';
import King from '../piece/king.js';

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

    initBoardPieces() {
        let pieces = new Map();
        
        pieces.set('00', new Rook('rook', 'white', 'RW1'));         //TODO: Refactor this !!!!
        pieces.set('10', new Knight('knight', 'white', 'NW1'));
        pieces.set('20', new Bishop('bishop', 'white', 'BW1'));
        pieces.set('30', new Queen('queen', 'white', 'QW'));
        pieces.set('40', new King('king', 'white', 'KW'));
        pieces.set('50', new Bishop('bishop', 'white', 'BW2'));
        pieces.set('60', new Knight('knight', 'white', 'NW2'));
        pieces.set('70', new Rook('rook', 'white', 'RW2'));

        pieces.set('07', new Rook('rook', 'black', 'RB1'));
        pieces.set('17', new Knight('knight', 'black', 'NB1'));
        pieces.set('27', new Bishop('bishop', 'black', 'BB1'));
        pieces.set('37', new Queen('queen', 'black', 'QB'));
        pieces.set('47', new King('king', 'black', 'KB'));
        pieces.set('57', new Bishop('bishop', 'black', 'BB2'));
        pieces.set('67', new Knight('knight', 'black', 'NB2'));
        pieces.set('77', new Rook('rook', 'black', 'RB2'));

        for (let i = 0; i < COL_COUNT; i++) {
            pieces.set(`${i}1`, new Pawn('pawn', 'white', `PW${i}`, {
                x: 1,
                y: i,
                stringFormat: `${i}1`
            }));

            pieces.set(`${i}6`, new Pawn('pawn', 'black', `PB${i}`, {
                x: 6,
                y: i,
                stringFormat: `${i}6`
            }));
        }

        return pieces;
    }
}

export default BoardInitializer;