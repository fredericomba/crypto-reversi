import React from 'react';

import './index.css';

export interface PropsPopupGiveUp {
  namePlayer: string;
  noCallBack: () => void;
  yesCallBack: () => void;
}

const PopupGiveUp: React.FC<PropsPopupGiveUp> = (props) => {

  const { namePlayer, noCallBack, yesCallBack } = props;

  return (
    <div className="PopupGiveUp">
      <div className="PopupGiveUp-information">
        { namePlayer },<br/>
        Are you sure you want to give up?
      </div>
      <div>
        <button className="PopupGiveUp-button" onClick={ yesCallBack }>Yes, Give Up</button>
        <button className="PopupGiveUp-button" onClick={ noCallBack }>No, Continue Game</button>
      </div>
    </div>
  );

};

export default PopupGiveUp;