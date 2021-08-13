import React from 'react';

import './index.css';

export interface PropsPopupNoMoves {
  namePlayer: string;
  acknowledge: () => void;
}

const PopupNoMoves: React.FC<PropsPopupNoMoves> = (props) => {

  const { namePlayer, acknowledge } = props;

  return (
    <div className="PopupNoMoves">
      <div className="PopupNoMoves-information">
        { namePlayer },<br/>
        There are no moves possible for you, so your turn has been skipped.
      </div>
      <button className="PopupNoMoves-button" onClick={ acknowledge }>Understood</button>
    </div>
  );

};

export default PopupNoMoves;