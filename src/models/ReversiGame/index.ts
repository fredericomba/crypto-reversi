enum Piece {
  NONE = 0,
  BLACK = 1,
  WHITE = 2,
}

const OPPOSITE_PIECE = (piece: Piece) => {

  if (piece === Piece.BLACK) {
    return Piece.WHITE;
  }

  if (piece === Piece.WHITE) {
    return Piece.BLACK;
  }

  const ERROR_NO_INVERSE = "the given piece has no inverse!";

  throw new Error(ERROR_NO_INVERSE);

};

const BLACK_FIRST_A = 35; // coordinates (3, 4)
const BLACK_FIRST_B = 28; // coordinates (4, 3)
const WHITE_FIRST_A = 27; // coordinates (3, 3)
const WHITE_FIRST_B = 36; // coordinates (4, 4)

const BOARD_LIMIT = 8;

const PANELS_COUNT = BOARD_LIMIT * BOARD_LIMIT | 0;

const INSIDE_BOARD = (x: number, y: number) => {

  const withinX = 0 <= x && x < BOARD_LIMIT;
  const withinY = 0 <= y && y < BOARD_LIMIT;

  return (withinX && withinY);

};

const CHECK_INSIDE_BOARD = (x: number, y: number) => {

  if (INSIDE_BOARD(x, y)) {
    return;
  }

  const ERROR_OUTSIDE_BOUNDS = "the given coordinates are outside the board!";

  throw new RangeError(ERROR_OUTSIDE_BOUNDS);

};

const INDEX_FROM_COORDINATES = (x: number, y: number) => {

  return ((y * BOARD_LIMIT | 0) + x | 0);

};

class GameData {

  currentPlayer: Piece = Piece.BLACK;
  pieces = new Uint8Array(64);

  constructor(model? : GameData) {

    this.pieces[BLACK_FIRST_A] = Piece.BLACK;
    this.pieces[BLACK_FIRST_B] = Piece.BLACK;
    this.pieces[WHITE_FIRST_A] = Piece.WHITE;
    this.pieces[WHITE_FIRST_B] = Piece.WHITE;

    if (model) {

      this.currentPlayer = model.currentPlayer;

      model.pieces.forEach((piece, index) => {

        this.pieces[index] = piece;

      });

    }

  }

  getCurrentPlayer() {
    return this.currentPlayer;
  }

  setCurrentPlayer(player: Piece) {
    this.currentPlayer = player;
  }

  getPiece(x: number, y: number) {

    CHECK_INSIDE_BOARD(x, y);

    const index = INDEX_FROM_COORDINATES(x, y);

    return this.pieces[index];

  }

  setPiece(x: number, y: number, piece: Piece) {

    CHECK_INSIDE_BOARD(x, y);

    const index = INDEX_FROM_COORDINATES(x, y);

    this.pieces[index] = piece;

  }

}

const DIRECTIONS = Object.freeze([
  Object.freeze([  0, +1]), // south
  Object.freeze([ -1, +1]), // south-east
  Object.freeze([ -1,  0]), // east
  Object.freeze([ -1, -1]), // north-east
  Object.freeze([  0, -1]), // north
  Object.freeze([ +1, -1]), // north-west
  Object.freeze([ +1,  0]), // west
  Object.freeze([ +1, +1]), // south-west
]);

class ReversiGame {

  static BOARD_LIMIT = BOARD_LIMIT;
  static PANELS_COUNT = PANELS_COUNT;
  static INSIDE_BOARD = INSIDE_BOARD;
  static INDEX_FROM_COORDINATES = INDEX_FROM_COORDINATES;

  static Piece = Piece;
  static GameData = GameData;

  gameData: GameData = new GameData();

  constructor(firstPlayer? : Piece, gameData? : GameData) {

    if (gameData) {

      this.gameData = new GameData(gameData);

    } else {

      const pieces = this.gameData.pieces;

      pieces[BLACK_FIRST_A] = Piece.BLACK;
      pieces[BLACK_FIRST_B] = Piece.BLACK;
      pieces[WHITE_FIRST_A] = Piece.WHITE;
      pieces[WHITE_FIRST_B] = Piece.WHITE;

    }

    if (firstPlayer) {

      this.gameData.setCurrentPlayer(firstPlayer);

    }

  }

  saveData() {
    return new GameData(this.gameData);
  }

  loadData(gameData: GameData) {
    this.gameData = new GameData(gameData);
  }

  getPiece(x: number, y: number) {

    return this.gameData.getPiece(x, y);

  }

  setPiece(x: number, y: number, piece: Piece) {

    this.gameData.setPiece(x, y, piece);

  }

  movePossible(x: number, y: number, piece: Piece) {

    const pieceOther = this.getPiece(x, y);

    if (pieceOther !== Piece.NONE) {
      return false;
    }

    const pieceOpposite = OPPOSITE_PIECE(piece);

    let movePossible = false;

    const { length } = DIRECTIONS;

    for (let index = 0; index < length; index = index + 1 | 0) {

      const [moveX, moveY] = DIRECTIONS[index];

      let countOther = 0;

      let foundPairing = false;

      let [currentX, currentY] = [x, y];

      while (true) {

        currentX = currentX + moveX | 0;
        currentY = currentY + moveY | 0;

        if (!INSIDE_BOARD(currentX, currentY)) {

          break;

        }

        const currentPiece = this.getPiece(currentX, currentY);

        if (currentPiece === piece) {

          foundPairing = true;
          break;

        }

        if (currentPiece !== pieceOpposite) {

          break;

        }

        countOther = countOther + 1 | 0;

      }

      if (foundPairing && countOther > 0) {

        movePossible = true;
        break;

      }

    }

    return movePossible;

  }

  tryMove(x: number, y: number) {

    const piece = this.currentPlayer();

    const pieceOther = this.getPiece(x, y);

    if (pieceOther !== Piece.NONE) {
      return false;
    }

    let moveDone = false;

    const pieceOpposite = OPPOSITE_PIECE(piece);

    const { length } = DIRECTIONS;

    for (let index = 0; index < length; index = index + 1 | 0) {

      const [moveX, moveY] = DIRECTIONS[index];

      let countOther = 0;

      let foundPairing = false;

      let [currentX, currentY] = [x, y];

      while (true) {

        currentX = currentX + moveX | 0;
        currentY = currentY + moveY | 0;

        if (!INSIDE_BOARD(currentX, currentY)) {

          break;

        }

        const currentPiece = this.getPiece(currentX, currentY);

        if (currentPiece === piece) {

          foundPairing = true;
          break;

        }

        if (currentPiece !== pieceOpposite) {

          break;

        }

        countOther = countOther + 1 | 0;

      }

      if (foundPairing && countOther > 0) {

        moveDone = true;

        [currentX, currentY] = [x, y];

        while (true) {

          currentX = currentX + moveX | 0;
          currentY = currentY + moveY | 0;

          const currentPiece = this.getPiece(currentX, currentY);

          if (currentPiece === piece) {

            break;

          }

          this.setPiece(currentX, currentY, piece);

        }

      }

    }

    if (moveDone) {

      this.setPiece(x, y, piece);

      this.gameData.setCurrentPlayer(pieceOpposite);

    }

    return moveDone;

  }

  currentPlayer() {
    return this.gameData.getCurrentPlayer();
  }

  possibleCount(player: Piece) {

    if (player !== Piece.BLACK && player !== Piece.WHITE) {
      return 0;
    }

    let count = 0;

    for (let x = 0; x < BOARD_LIMIT; x = x + 1 | 0) {

      for (let y = 0; y < BOARD_LIMIT; y = y + 1 | 0) {

        if (this.movePossible(x, y, player)) {

          count = count + 1 | 0;

        }

      }

    }

    return count;

  }

  finished() {

    const countBlack = this.possibleCount(Piece.BLACK);
    const countWhite = this.possibleCount(Piece.WHITE);

    return (countBlack === 0 && countWhite === 0);

  }

}

export default ReversiGame;
