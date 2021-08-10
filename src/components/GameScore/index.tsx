import React from 'react';

import './index.css';

export interface PropsGameScore {
  color: string;
  iconBlack: string;
  iconWhite: string;
  countBlack: number;
  countWhite: number;
}

const GameScore: React.FC<PropsGameScore> = (props) => {

  const { color, iconBlack, iconWhite, countBlack, countWhite } = props;

  const styleBackLayer = Object.freeze({
    background: color,
  });

  const styleBlack = Object.freeze({
    backgroundImage: `url(${ iconBlack })`,
  });

  const styleWhite = Object.freeze({
    backgroundImage: `url(${ iconWhite })`,
  });

  return (
    <div className="GameScore">
      <div className="GameScore-score" style={ styleBackLayer }>
        <div className="GameScore-score-icon" style={ styleBlack }></div>
        <div className="GameScore-score-count">{ countBlack }</div>
      </div>
      <div className="GameScore-score" style={ styleBackLayer }>
        <div className="GameScore-score-icon" style={ styleWhite } ></div>
        <div className="GameScore-score-count">{ countWhite }</div>
      </div>
    </div>
  );

};

export default GameScore;