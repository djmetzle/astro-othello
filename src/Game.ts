export enum Token {
  Black,
  White,
  Empty,
}

export default class Game {
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
}

class Board {
  board: Token[][]

  constructor() {
    this.board = []
    this.init()
  }

  at(x: number, y: number): Token {
    return Token.Black
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
