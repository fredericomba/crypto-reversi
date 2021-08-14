import React from 'react';

import GameBoard, { PropsGameBoard } from '../../components/GameBoard/index';
import GameScore, { PropsGameScore } from '../../components/GameScore/index';
import Popup, { PropsPopup } from '../../components/Popup/index';

import PopupNewGame, { PropsPopupNewGame } from '../../components/Popup/NewGame/index';
import PopupSettings, { PropsPopupSettings } from '../../components/Popup/Settings/index';
import PopupNoMoves, { PropsPopupNoMoves } from '../../components/Popup/NoMoves/index';
import PopupGiveUp, { PropsPopupGiveUp } from '../../components/Popup/GiveUp/index';

import ReversiGame from '../../models/ReversiGame';

import './index.css';
import iconLitecoin from './litecoin.png';
import iconBitcoin from './bitcoin.png';

const { BOARD_LIMIT, INDEX_FROM_COORDINATES } = ReversiGame;

const { Piece } = ReversiGame;

interface PropsApp {}

const LABEL_NEW_GAME = 'NEW GAME';

const LABEL_GIVE_UP = 'GIVE UP';

const DEFAULT_BACK_COLOR = '#2EAE52';

const DEFAULT_NAME_PLAYER = 'nobody';

const DEFAULT_NAME_BLACK = 'bitcoin';

const DEFAULT_NAME_WHITE = 'litecoin';

const DEFAULT_ICON_BLACK = iconBitcoin;

const DEFAULT_ICON_WHITE = iconLitecoin;

const DEFAULT_GAME_SITUATION = 'Waiting for new game';

const CURRENT_PLAYER = (
  board: ReversiGame,
  nameBlack: string,
  nameWhite: string
) => {

  const player = board.currentPlayer();

  if (player === ReversiGame.Piece.BLACK) {
    return nameBlack;
  }

  if (player === ReversiGame.Piece.WHITE) {
    return nameWhite;
  }

  return DEFAULT_NAME_PLAYER;

};

const MESSAGE_NOW_PLAYING = (player: string) => `Now playing: ${ player }`;

const MESSAGE_NO_MOVES_POSSIBLE = (player: string) => `No moves possible for: ${ player }`;

const MESSAGE_GAME_OVER_WINNER = (player: string) => `Game over! The winner is: ${ player }!`;

const MESSAGE_GAME_OVER_TIE = 'Game over! It\'s a tie!';

const App: React.FC<PropsApp> = () => {

  const [moves, setMoves] = React.useState(0);

  const [mainLabel, setMainLabel] = React.useState(LABEL_NEW_GAME);

  const [backColor, setBackColor] = React.useState(DEFAULT_BACK_COLOR);

  const [namePlayer, setNamePlayer] = React.useState(DEFAULT_NAME_PLAYER);

  const [nameBlack, setNameBlack] = React.useState(DEFAULT_NAME_BLACK);

  const [nameWhite, setNameWhite] = React.useState(DEFAULT_NAME_WHITE);

  const [iconBlack, setIconBlack] = React.useState(DEFAULT_ICON_BLACK);

  const [iconWhite, setIconWhite] = React.useState(DEFAULT_ICON_WHITE);

  const [countBlack, setCountBlack] = React.useState(0);

  const [countWhite, setCountWhite] = React.useState(0);

  const [gameSituation, setGameSituation] = React.useState(DEFAULT_GAME_SITUATION);

  const acceptInput = React.useRef(false);

  const board = React.useRef(new ReversiGame());

  const updateSituation = () => {

    const currentBoard = board.current;

    const possibilitiesBlack = currentBoard.possibleCount(Piece.BLACK);

    const possibilitiesWhite = currentBoard.possibleCount(Piece.WHITE);

    if (possibilitiesBlack === 0 && possibilitiesWhite === 0) { // game over

      acceptInput.current = false;

      setMainLabel(LABEL_NEW_GAME);

      if (countBlack === countWhite) {

        setGameSituation(MESSAGE_GAME_OVER_TIE);
        return;

      }

      if (countBlack > countWhite) {

        setGameSituation(MESSAGE_GAME_OVER_WINNER(nameBlack));
        return;

      }

      if (countBlack < countWhite) {

        setGameSituation(MESSAGE_GAME_OVER_WINNER(nameWhite));
        return;

      }

      return;

    }

    const currentPlayer = currentBoard.currentPlayer();

    const namePlayer = CURRENT_PLAYER(board.current, nameBlack, nameWhite);

    setNamePlayer(namePlayer);

    const possibilitiesCurrent = currentBoard.possibleCount(currentPlayer);

    if (possibilitiesCurrent === 0) { // a player without moves must pass.

      setGameSituation(MESSAGE_NO_MOVES_POSSIBLE(namePlayer));
      invokeNoMoves();
      return;

    }

    setGameSituation(MESSAGE_NOW_PLAYING(namePlayer));

  };

  const click = (x: number, y: number) => {

    if (!acceptInput.current) {
      return;
    }

    const boardData = board.current;

    const moveMade = boardData.tryMove(x, y);

    if (moveMade) {

      setMoves(moves + 1 | 0);

      updateSituation();

    }

  };

  React.useEffect(() => {

    const currentBoard = board.current;

    let countBlack = 0;
    let countWhite = 0;

    for (let x = 0; x < BOARD_LIMIT; x = x + 1 | 0) {

      for (let y = 0; y < BOARD_LIMIT; y = y + 1 | 0) {

        const piece = currentBoard.getPiece(x, y);

        if (piece === Piece.BLACK) {

          countBlack = countBlack + 1 | 0;

        }

        if (piece === Piece.WHITE) {

          countWhite = countWhite + 1 | 0;

        }

      }

    }

    setCountBlack(countBlack);
    setCountWhite(countWhite);

  }, [board, moves]);

  const propsGameBoard: PropsGameBoard = {
    board: board.current,
    click: click,
    moves: moves,
    color: backColor,
    iconBlack: iconBlack,
    iconWhite: iconWhite,
  };

  const propsGameScore: PropsGameScore = {
    color: backColor,
    nameBlack: nameBlack,
    nameWhite: nameWhite,
    countBlack: countBlack,
    countWhite: countWhite,
    iconBlack: iconBlack,
    iconWhite: iconWhite,
  };

  const [popupVisible, setPopupVisible] = React.useState(false);

  const propsPopup = React.useRef<PropsPopup>({
    visible: popupVisible,
    title: "Nothing",
    content: null,
    close: () => { /* do nothing */ },
  });

  propsPopup.current.visible = popupVisible;

  const defaultPopupClose = () => {

    setPopupVisible(false);

  };

  const invokeNewGame = () => {

    let firstPlayer = Piece.BLACK;

    const setFirstPlayer = (player: number) => {

      firstPlayer = player;

    };

    const gameStart = () => {

      acceptInput.current = true;

      setMoves(0);

      setMainLabel(LABEL_GIVE_UP);

      board.current = new ReversiGame();

      board.current.gameData.currentPlayer = firstPlayer;

      updateSituation();

      defaultPopupClose();

    };

    const propsPopupNewGame: PropsPopupNewGame = {
      nameBlack: nameBlack,
      nameWhite: nameWhite,
      setFirstPlayer: setFirstPlayer,
      gameStart: gameStart,
    };

    const content = (<PopupNewGame { ...propsPopupNewGame } />);

    const currentPropsPopup = propsPopup.current;

    currentPropsPopup.title = "New Game";
    currentPropsPopup.content = content;
    currentPropsPopup.close = defaultPopupClose;

    setPopupVisible(true);

  };

  const invokeSettings = () => {

    const applySettings = (
      backColor: string,
      iconBlack: string,
      iconWhite: string,
      nameBlack: string,
      nameWhite: string,
    ) => {

      setBackColor(backColor);

      setIconBlack(iconBlack);
      setIconWhite(iconWhite);

      setNameBlack(nameBlack);
      setNameWhite(nameWhite);

      defaultPopupClose();

    };


    const propsPopupSettings: PropsPopupSettings = {
      backColor: backColor,
      iconBlack: iconBlack,
      iconWhite: iconWhite,
      nameBlack: nameBlack,
      nameWhite: nameWhite,
      applySettings: applySettings,
    };

    const content = (<PopupSettings { ...propsPopupSettings } />);

    const currentPropsPopup = propsPopup.current;

    currentPropsPopup.title = "Settings";
    currentPropsPopup.content = content;
    currentPropsPopup.close = defaultPopupClose;

    setPopupVisible(true);

  };

  const invokeNoMoves = () => {

    const acknowledge = () => {

      const currentBoard = board.current;

      const currentPlayer = currentBoard.currentPlayer();

      let otherPlayer = Piece.NONE;

      if (currentPlayer === Piece.BLACK) {

        otherPlayer = Piece.WHITE;

      }

      if (currentPlayer === Piece.WHITE) {

        otherPlayer = Piece.BLACK;

      }

      currentBoard.gameData.currentPlayer = otherPlayer;

      updateSituation();

      defaultPopupClose();

    };

    const propsPopupNoMoves: PropsPopupNoMoves = {
      namePlayer: namePlayer,
      acknowledge: acknowledge, 
    };

    const content = (<PopupNoMoves { ...propsPopupNoMoves } />);

    const currentPropsPopup = propsPopup.current;

    currentPropsPopup.title = "No Moves Possible";
    currentPropsPopup.content = content;
    currentPropsPopup.close = acknowledge;

    setPopupVisible(true);

  };

  const invokeGiveUp = () => {

    const yesCallBack = () => {

      acceptInput.current = false;

      const currentBoard = board.current;

      const currentPlayer = currentBoard.currentPlayer();

      if (currentPlayer === Piece.BLACK) {

        setGameSituation(MESSAGE_GAME_OVER_WINNER(nameWhite));

      }

      if (currentPlayer === Piece.WHITE) {

        setGameSituation(MESSAGE_GAME_OVER_WINNER(nameBlack));

      }

      setMainLabel(LABEL_NEW_GAME);

      defaultPopupClose();

    };

    const propsPopupGiveUp: PropsPopupGiveUp = {
      namePlayer: namePlayer,
      noCallBack: defaultPopupClose,
      yesCallBack: yesCallBack, 
    };

    const content = (<PopupGiveUp { ...propsPopupGiveUp } />);

    const currentPropsPopup = propsPopup.current;

    currentPropsPopup.title = "Give Up";
    currentPropsPopup.content = content;
    currentPropsPopup.close = defaultPopupClose;

    setPopupVisible(true);

  };

  const mainAction = mainLabel === LABEL_NEW_GAME ? invokeNewGame : invokeGiveUp;

  return (
    <div className="App">
      <div className="App-row">
        <h1>CRYPTO REVERSI</h1>
      </div>
      <div className="App-row">
        <button className="App-button" onClick={ mainAction }>{ mainLabel }</button>
        <button className="App-button" onClick={ invokeSettings }>SETTINGS</button>
      </div>
      <div className="App-row">
        <div className="App-game-situation">{ gameSituation }</div>
      </div>
      <div className="App-row">
        <GameBoard { ...propsGameBoard } />
        <GameScore { ...propsGameScore } />
      </div>
      <Popup { ...propsPopup.current } />
    </div>
  );

}

export default App;
