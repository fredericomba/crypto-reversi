import React from 'react';
import ReversiGame from '../../models/ReversiGame';

import './index.css';

const PIECE_NAMES = new Map<number, string>();

PIECE_NAMES.set(ReversiGame.Piece.NONE, "none");
PIECE_NAMES.set(ReversiGame.Piece.BLACK, "black");
PIECE_NAMES.set(ReversiGame.Piece.WHITE, "white");

export interface PropsGameButton {
  iconBlack: string;
  iconWhite: string;
  color: string;
  click: (x: number, y: number) => void;
  x: number;
  y: number;
  piece: string;
}

const GameButton: React.FC<PropsGameButton> = (props) => {

  const { color, iconBlack, iconWhite } = props;

  const { click, x, y } = props;

  const { piece } = props;

  const styleBackLayer = Object.freeze({
    background: color,
  });

  const styleBlack = Object.freeze({
    backgroundImage: `url(${ iconBlack })`,
  });

  const styleWhite = Object.freeze({
    backgroundImage: `url(${ iconWhite })`,
  });

  const propsButton = {
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

export default GameButton;