import React from 'react';
import ReversiGame from '../../../models/ReversiGame';

import './index.css';

export interface PropsPopupNewGame {
  nameBlack: string;
  nameWhite: string;
  setFirstPlayer: (piece: number) => void;
  gameStart: () => void;
}

const PopupNewGame : React.FC<PropsPopupNewGame> = (props) => {

  const { nameBlack, nameWhite, setFirstPlayer, gameStart } = props;

  const radioBlack = React.useRef<HTMLInputElement>(null);

  const radioWhite = React.useRef<HTMLInputElement>(null);

  const clickStartGame = () => {

    const inputBlack = radioBlack.current as HTMLInputElement;
    const inputWhite = radioWhite.current as HTMLInputElement;

    if (inputBlack.checked) {

      setFirstPlayer(ReversiGame.Piece.BLACK);

    }

    if (inputWhite.checked) {

      setFirstPlayer(ReversiGame.Piece.WHITE);

    }

    gameStart();

  };

  const propsButton = {
    onClick: clickStartGame,
  };

  const propsRadioBlack = {
    type: 'radio',
    name: 'first-player',
    defaultChecked: true,
  };

  const propsRadioWhite = {
    type: 'radio',
    name: 'first-player',
  };

  return (
    <div className="PopupNewGame">
      <div className="PopupNewGame-row">
        <div className="PopupNewGame-row-title">FIRST PLAYER:</div>
        <div className="PopupNewGame-row-option">
          <input ref={ radioBlack } { ...propsRadioBlack } /> <span>{ nameBlack }</span>
        </div>
        <div className="PopupNewGame-row-option">
          <input ref={ radioWhite } { ...propsRadioWhite } /> <span>{ nameWhite }</span>
        </div>
      </div>
      <button className="PoppNewGame-button" { ...propsButton }>START GAME</button>
    </div>
  );

};

export default PopupNewGame;