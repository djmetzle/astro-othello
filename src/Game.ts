export enum Token {
  Black,
  White,
  Empty,
}

export class Game {
  board_ref: Board
  turn: Token

  constructor() {
    this.board_ref = new Board()
    this.turn = Token.White
  }

  current_turn() {
    return this.turn
  }

  get board() {
    return this.board_ref
  }

  place(x: number, y: number): boolean {
    if (!this.valid(x, y)) {
      return false;
    }
    this.board.board[x][y] = this.turn
    this.turn = this.turn == Token.White ? Token.Black : Token.White
    return true;
  }

  valid(x: number, y: number): boolean {
    if (this.board.at(x, y) !== Token.Empty) {
      return false;
    }

    for (let offset of this.pencil()) {
      const x_offset = x + offset[0]
      const y_offset = y + offset[1]
      if ((0 <= x_offset && x_offset < 8)
        && (0 <= y_offset && y_offset < 8)) {
        const offset_token = this.board.at(x_offset, y_offset);
        if (offset_token !== Token.Empty && offset_token !== this.turn) {
          return true;
        }
      }
    }
    return false;
  }

  pencil(): number[][] {
    return [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
  }
}

class Board {
  board: Token[][]

  constructor() {
    this.board = []
    this.init()
  }

  at(x: number, y: number): Token {
    return this.board[x][y]
  }

  init() {
    for (let i = 0; i < 8; i++) {
      this.board[i] = []
      for (let j = 0; j < 8; j++) {
        this.board[i][j] = Token.Empty
      }
    }

    this.board[3][3] = Token.White
    this.board[3][4] = Token.Black
    this.board[4][3] = Token.Black
    this.board[4][4] = Token.White
  }
}
