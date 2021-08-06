import React from 'react';
import ReversiGame from '../../models/ReversiGame';

import './index.css';

const { BOARD_LIMIT, INDEX_FROM_COORDINATES } = ReversiGame;

const PIECE_NAMES = new Map<number, string>();

PIECE_NAMES.set(ReversiGame.Piece.NONE, "none");
PIECE_NAMES.set(ReversiGame.Piece.BLACK, "black");
PIECE_NAMES.set(ReversiGame.Piece.WHITE, "white");

interface PropsGameButton {
  styleBackLayer: object;
  styleBlack: object;
  styleWhite: object;
  click: (x: number, y: number) => void;
  x: number;
  y: number;
  piece: string;
}

const GameButton: React.FC<PropsGameButton> = (props) => {

  const { styleBackLayer, styleBlack, styleWhite } = props;

  const { click, x, y } = props;

  const { piece } = props;

  const propsButton = {
    style: styleBackLayer,
    onClick: () => click(x, y),
    'data-piece': piece,
  };

  const propsBackLayer = {
    style: styleBackLayer,
  };

  const propsBlack = {
    style: styleBlack,
  };

  const propsWhite = {
    style: styleWhite,
  };

  return (
    <button className="GameButton" { ...propsButton }>
      <div className="GameButton-back-layer" { ...propsBackLayer }></div>
      <div className="GameButton-piece-black" { ...propsBlack }></div>
      <div className="GameButton-piece-white" { ...propsWhite }></div>
    </button>
  );

};

interface PropsGameBoard {
  color: string;
  board: ReversiGame;
  moves: number;
  click: (x: number, y: number) => void;
  iconBlack: string;
  iconWhite: string;
}

const GameBoard: React.FC<PropsGameBoard> = (props) => {

  const [styleBackLayer, setStyleBackLayer] = React.useState<object>({});

  const [styleBlack, setStyleBlack] = React.useState<object>({});

  const [styleWhite, setStyleWhite] = React.useState<object>({});

  const { board, moves, click, color, iconBlack, iconWhite } = props;

  React.useEffect(() => {

    const styleBackLayer = Object.freeze({
      background: color,
    });

    setStyleBackLayer(styleBackLayer);

  }, [color]);

  React.useEffect(() => {

    const styleBlack = Object.freeze({
      backgroundImage: `url(${ iconBlack })`,
    });

    setStyleBlack(styleBlack);

  }, [iconBlack]);

  React.useEffect(() => {

    const styleWhite = Object.freeze({
      backgroundImage: `url(${ iconWhite })`,
    });

    setStyleWhite(styleWhite);

  }, [iconWhite]);

  const pieces = [];

  for (let x = 0; x < BOARD_LIMIT; x = x + 1 | 0) {

    for (let y = 0; y < BOARD_LIMIT; y = y + 1 | 0) {

      const index = INDEX_FROM_COORDINATES(x, y);

      const piece: string = PIECE_NAMES.get(board.getPiece(x, y)) as string;

      const propsGameButton: PropsGameButton = {
        styleBackLayer: styleBackLayer,
        styleBlack: styleBlack,
        styleWhite: styleWhite,
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