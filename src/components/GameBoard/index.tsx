import React from 'react';
import GameButton from '../../components/GameButton/index';
import ReversiGame from '../../models/ReversiGame';

import './index.css';

const { BOARD_LIMIT, INDEX_FROM_COORDINATES } = ReversiGame;

const PIECE_NAMES = new Map<number, string>();

PIECE_NAMES.set(ReversiGame.Piece.NONE, "none");
PIECE_NAMES.set(ReversiGame.Piece.BLACK, "black");
PIECE_NAMES.set(ReversiGame.Piece.WHITE, "white");

export interface PropsGameBoard {
  color: string;
  board: ReversiGame;
  moves: number;
  click: (x: number, y: number) => void;
  iconBlack: string;
  iconWhite: string;
}

const GameBoard: React.FC<PropsGameBoard> = (props) => {

  const { board, moves, click, color, iconBlack, iconWhite } = props;

  const pieces = [];

  for (let x = 0; x < BOARD_LIMIT; x = x + 1 | 0) {

    for (let y = 0; y < BOARD_LIMIT; y = y + 1 | 0) {

      const index = INDEX_FROM_COORDINATES(x, y);

      const piece: string = PIECE_NAMES.get(board.getPiece(x, y)) as string;

      const propsGameButton = {
        iconBlack: iconBlack,
        iconWhite: iconWhite,
        color: color,
        click: click,
        piece: piece,
        x: x,
        y: y,
      };

      const gameButton = (
        <GameButton key={ index } { ...propsGameButton } />
      );

      pieces.push(gameButton);

    }

  }

  return (
    <div className="GameBoard">
      <div className="GameBoard-buttons">{ pieces }</div>
      <div className="GameBoard-moves">MOVES: { moves }</div>
    </div>
  );

};

export default GameBoard;