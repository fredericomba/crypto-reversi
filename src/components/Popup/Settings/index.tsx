import React from 'react';

import './index.css';

export interface PropsPopupSettings {
  backColor: string;
  iconBlack: string;
  iconWhite: string;
  nameBlack: string;
  nameWhite: string;

  applySettings: (
    backColor: string,
    iconBlack: string,
    iconWhite: string,
    nameBlack: string,
    nameWhite: string,
  ) => void;

}

const PopupSettings: React.FC<PropsPopupSettings> = (props) => {

  const { backColor, iconBlack, iconWhite, nameBlack, nameWhite } = props;

  const { applySettings } = props;

  const inputColor = React.useRef<HTMLInputElement>(null);

  const inputNameBlack = React.useRef<HTMLInputElement>(null);

  const inputNameWhite = React.useRef<HTMLInputElement>(null);

  const inputIconBlack = React.useRef<HTMLInputElement>(null);

  const inputIconWhite = React.useRef<HTMLInputElement>(null);

  const [liveColor, setLiveColor] = React.useState(backColor);

  const [liveBlack, setLiveBlack] = React.useState(iconBlack);

  const [liveWhite, setLiveWhite] = React.useState(iconWhite);

  const changeColor = () => {

    const colorElement = inputColor.current as HTMLInputElement;

    setLiveColor(colorElement.value);

  };

  const changeFileBlack = () => {

    const iconBlackElement = inputIconBlack.current as HTMLInputElement;

    const filesList = iconBlackElement.files as FileList;

    const fileBlack = filesList[0];

    if (fileBlack) {

      const iconBlack = URL.createObjectURL(fileBlack);

      setLiveBlack(iconBlack);

    }

  };

  const changeFileWhite = () => {

    const iconWhiteElement = inputIconWhite.current as HTMLInputElement;

    const filesList = iconWhiteElement.files as FileList;

    const fileWhite = filesList[0];

    if (fileWhite) {

      const iconWhite = URL.createObjectURL(fileWhite);

      setLiveWhite(iconWhite);

    }

  };

  const clickApplySettings = () => {

    const colorElement = inputColor.current as HTMLInputElement;
    const nameBlackElement = inputNameBlack.current as HTMLInputElement;
    const nameWhiteElement = inputNameWhite.current as HTMLInputElement;

    const backColor = colorElement.value;
    const nameBlack = nameBlackElement.value;
    const nameWhite = nameWhiteElement.value;

    applySettings(
      backColor,
      liveBlack,
      liveWhite,
      nameBlack,
      nameWhite
    );

  };

  const styleFile = {
    background: liveColor,
  };

  const styleBlack = {
    backgroundImage: `url(${ liveBlack })`,
  };

  const styleWhite = {
    backgroundImage: `url(${ liveWhite })`,
  };

  const propsColor = {
    ref: inputColor,
    defaultValue: backColor,
    onChange: changeColor,
  };

  const propsNameBlack = {
    ref: inputNameBlack,
    defaultValue: nameBlack,
  };

  const propsNameWhite = {
    ref: inputNameWhite,
    defaultValue: nameWhite,
  };

  const propsFile = {
    style: styleFile,
  };

  const propsFileBlack = {
    ref: inputIconBlack,
    accept: "image/*",
    onChange: changeFileBlack,
  };

  const propsFileWhite = {
    ref: inputIconWhite,
    accept: "image/*",
    onChange: changeFileWhite,
  };

  const propsIconBlack = {
    style: styleBlack,
  };

  const propsIconWhite = {
    style: styleWhite,
  };

  const propsButton = {
    onClick: clickApplySettings,
  };

  return (
    <div className="PopupSettings">
      <div className="PopupSettings-row">
        <div className="PopupSettings-input-horizontal">
          <div className="PopupSettings-input-label">BACKGROUND:</div>
          <input type="color" { ...propsColor } />
        </div>
      </div>
      <div className="PopupSettings-row">
        <div className="PopupSettings-input-horizontal">
          <div className="PopupSettings-input-label">PLAYER BLACK:</div>
          <input type="text" { ...propsNameBlack }/>
        </div>
      </div>
      <div className="PopupSettings-row">
        <div className="PopupSettings-input-horizontal">
          <div className="PopupSettings-input-label">PLAYER WHITE:</div>
          <input type="text" { ...propsNameWhite }/>
        </div>
      </div>
      <div className="PopupSettings-row">
        <div className="PopupSettings-input-vertical">
          <div className="PopupSettings-input-label">ICON FOR BLACK:</div>
          <div className="PopupSettings-input-file" { ...propsFile }>
            <div className="PopupSettings-input-icon" { ...propsIconBlack }></div>
            <input type="file" { ...propsFileBlack } />
          </div>
        </div>
        <div className="PopupSettings-input-vertical">
          <div className="PopupSettings-input-label">ICON FOR WHITE:</div>
          <div className="PopupSettings-input-file" { ...propsFile }>
            <div className="PopupSettings-input-icon" { ...propsIconWhite }></div>
            <input type="file" { ...propsFileWhite }/>
          </div>
        </div>
      </div>
      <div className="PopupSettings-row">
        <button className="PopupSettings-button" { ...propsButton }>APPLY CHANGES</button>
      </div>

    </div>
  );

};

export default PopupSettings;