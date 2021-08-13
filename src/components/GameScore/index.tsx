import React from 'react';

import './index.css';

export interface PropsGameScore {
  color: string;
  nameBlack: string;
  nameWhite: string;
  iconBlack: string;
  iconWhite: string;
  countBlack: number;
  countWhite: number;
}

const GameScore: React.FC<PropsGameScore> = (props) => {

  const { color, iconBlack, iconWhite, countBlack, countWhite } = props;

  const { nameBlack, nameWhite } = props;

  const styleBackLayer = Object.freeze({
    backgroundColor: color,
  });

  const styleBlack = Object.freeze({
    backgroundImage: `url(${ iconBlack })`,
  });

  const styleWhite = Object.freeze({
    backgroundImage: `url(${ iconWhite })`,
  });

  return (
    <div className="GameScore">
      <div className="GameScore-score">
        <div className="GameScore-score-piece" style={ styleBackLayer }>
          <div className="GameScore-score-icon" style={ styleBlack }></div>
        </div>
        <div className="GameScore-score-count">
          <span>{ nameBlack }:</span>
          <span>{ countBlack }</span>
        </div>
      </div>
      <div className="GameScore-score">
        <div className="GameScore-score-piece" style={ styleBackLayer }>
          <div className="GameScore-score-icon" style={ styleWhite }></div>
        </div>
        <div className="GameScore-score-count">
          <span>{ nameWhite }:</span>
          <span>{ countWhite }</span>
        </div>
      </div>
    </div>
  );

};

export default GameScore;