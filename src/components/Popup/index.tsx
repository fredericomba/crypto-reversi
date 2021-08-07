import React, { ReactElement } from 'react';

import './index.css';
import closeIcon from './close-button.svg';

interface PropsPopup {
  visible: boolean;
  title: string;
  content: ReactElement | null;
  close: () => void;
}

const Popup: React.FC<PropsPopup> = (props) => {

  const { visible, title, content, close } = props;

  const propsPopup = {
    'data-visible': visible ? 'true' : 'false',
  };

  const styleClose = {
    backgroundImage: `url('${ closeIcon }')`,
  };

  const propsClose = {
    onClick: close,
    style: styleClose,
  };

  return (
    <div className="Popup" { ...propsPopup }>
      <div className="Popup-body">
        <div className="Popup-body-title">{ title }</div>
        <button className="Popup-body-close" { ...propsClose }></button>
        <div className="Popup-body-content">{ content }</div>
      </div>
    </div>
  );

};

export default Popup;