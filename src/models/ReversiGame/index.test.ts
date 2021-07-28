import ReversiGame from './index';

describe('ReversiGame(firstPlayer, gameData)', () => {

  expect(typeof ReversiGame).toEqual('function'); // class ReversiGame

  describe('BOARD_LIMIT', () => {

    expect(ReversiGame.BOARD_LIMIT).not.toBeUndefined();
    expect(typeof ReversiGame.BOARD_LIMIT).toEqual('number');
    expect(ReversiGame.BOARD_LIMIT).toEqual(8);

  });

  describe('Piece', () => {

    expect(ReversiGame.Piece).not.toBeUndefined();
    expect(typeof ReversiGame.Piece).toEqual('object');
    expect(ReversiGame.Piece.NONE).not.toBeUndefined();
    expect(ReversiGame.Piece.WHITE).not.toBeUndefined();
    expect(ReversiGame.Piece.BLACK).not.toBeUndefined();

  });

  describe('GameData()', () => {

    expect(ReversiGame.GameData).not.toBeUndefined();
    expect(typeof ReversiGame.GameData).toEqual('function'); // class GameData

  });

  describe('saveData() => GameData', () => {

    expect(ReversiGame.prototype.saveData).not.toBeUndefined();
    expect(typeof ReversiGame.prototype.saveData).toEqual('function');

  });

  describe('loadData(gameData: GameData) => void', () => {

    expect(ReversiGame.prototype.loadData).not.toBeUndefined();
    expect(typeof ReversiGame.prototype.loadData).toEqual('function');

  });

  describe('getPiece(x: number, y: number) => Piece', () => {

    expect(ReversiGame.prototype.getPiece).not.toBeUndefined();
    expect(typeof ReversiGame.prototype.getPiece).toEqual('function');

  });

  describe('setPiece(x: number, y: number, piece: Piece) => void', () => {

    expect(ReversiGame.prototype.setPiece).not.toBeUndefined();
    expect(typeof ReversiGame.prototype.setPiece).toEqual('function');

  });

  describe('movePossible(x: number, y: number, player: Piece) => boolean', () => {

    expect(ReversiGame.prototype.movePossible).not.toBeUndefined();
    expect(typeof ReversiGame.prototype.movePossible).toEqual('function');

  });

  describe('tryMove(x: number, y: number) => boolean', () => {

    expect(ReversiGame.prototype.tryMove).not.toBeUndefined();
    expect(typeof ReversiGame.prototype.tryMove).toEqual('function');

  });

  describe('currentPlayer() => Piece', () => {

    expect(ReversiGame.prototype.currentPlayer).not.toBeUndefined();
    expect(typeof ReversiGame.prototype.currentPlayer).toEqual('function');

  });

  describe('possibleCount(player: Piece) => number', () => {

    expect(ReversiGame.prototype.possibleCount).not.toBeUndefined();
    expect(typeof ReversiGame.prototype.possibleCount).toEqual('function');

  });

  describe('finished() => boolean', () => {

    expect(ReversiGame.prototype.finished).not.toBeUndefined();
    expect(typeof ReversiGame.prototype.finished).toEqual('function');

  });

  const allPositions = new Map();

  for (let x = 0; x < ReversiGame.BOARD_LIMIT; x = x + 1 | 0) {

    for (let y = 0; y < ReversiGame.BOARD_LIMIT; y = y + 1 | 0) {

      const index = (y * ReversiGame.BOARD_LIMIT | 0) + x | 0;

      allPositions.set(index, Object.freeze([x, y]));

    }

  }

  const firstBlackPositions = new Set<number>();

  const firstWhitePositions = new Set<number>();

  const firstBlackPositionsData: [number, number][] = [[3, 4], [4, 3]];

  const firstWhitePositionsData: [number, number][] = [[3, 3], [4, 4]];

  const firstBlackMoves = new Set<number>();

  const firstWhiteMoves = new Set<number>();

  const firstBlackMovesData: [number, number][] = [[3, 2], [2, 3], [5, 4], [4, 5]];

  const firstWhiteMovesData: [number, number][] = [[4, 2], [5, 3], [2, 4], [3, 5]];

  const register = (set: Set<number>, coordinates: [number, number][]) => {

    coordinates.forEach((coordinate: [number, number]) => {

      const [x, y] = coordinate;
  
      const index = (y * ReversiGame.BOARD_LIMIT | 0) + x | 0;
  
      set.add(index);
  
    });

  };

  register(firstBlackPositions, firstBlackPositionsData);

  register(firstWhitePositions, firstWhitePositionsData);

  register(firstBlackMoves, firstBlackMovesData);

  register(firstWhiteMoves, firstWhiteMovesData);

  let reversiGame: ReversiGame | null = null;

  beforeEach(() => {

    reversiGame = new ReversiGame();

  });

  test('default reversiGame', () => {

    reversiGame = reversiGame as ReversiGame;

    expect(reversiGame.currentPlayer()).toEqual(ReversiGame.Piece.BLACK);

    // check if all pieces in the board are the expected ones

    for (const [index, [x, y]] of allPositions) {

      let expectedBlack = firstBlackPositions.has(index);
      let expectedWhite = firstWhitePositions.has(index);

      const expectedNone = !expectedBlack && !expectedWhite;

      const piece = reversiGame.getPiece(x, y);

      if (expectedBlack) {

        expect(piece).toEqual(ReversiGame.Piece.BLACK);

      }

      if (expectedWhite) {

        expect(piece).toEqual(ReversiGame.Piece.WHITE);

      }

      if (expectedNone) {

        expect(piece).toEqual(ReversiGame.Piece.NONE);

      }

    }

    // black should have four possible moves at the beginning
    expect(reversiGame.possibleCount(ReversiGame.Piece.BLACK)).toEqual(4);

    // white should have four possible moves at the beginning
    expect(reversiGame.possibleCount(ReversiGame.Piece.WHITE)).toEqual(4);

  });

  test('playing reversiGame', () => {

    reversiGame = reversiGame as ReversiGame;

    // the piece at (3, 3) must be white at start
    expect(reversiGame.getPiece(3, 3)).toEqual(ReversiGame.Piece.WHITE);

    // white should NOT be able to play at (2, 2)
    expect(reversiGame.movePossible(2, 2, ReversiGame.Piece.WHITE)).toBe(false);

    // black can play at (3, 2), and plays there.
    expect(reversiGame.tryMove(3, 2)).toBe(true);

    // now it's white's turn
    expect(reversiGame.currentPlayer()).toEqual(ReversiGame.Piece.WHITE);

    // the piece at (3, 3) should now be black
    expect(reversiGame.getPiece(3, 3)).toEqual(ReversiGame.Piece.BLACK);

    // white should now be able to play at (2, 2)
    expect(reversiGame.movePossible(2, 2, ReversiGame.Piece.WHITE)).toBe(true);

    // white plays at (2, 2)
    expect(reversiGame.tryMove(2, 2)).toBe(true);

    // now it's black's turn
    expect(reversiGame.currentPlayer()).toEqual(ReversiGame.Piece.BLACK);

  });

});