export enum Token {
  Black,
  White,
  Empty,
}

export class Game {
  board_ref: Board
  turn: Token
  complete: boolean

  constructor() {
    this.board_ref = new Board()
    this.turn = Token.White
    this.complete = false
  }

  current_turn(): Token {
    return this.turn
  }

  other_turn(): Token {
    return this.turn === Token.White ? Token.Black : Token.White
  }

  winner(): Token | 'tie' | false {
    if (this.complete) {
      const [white, black] = this.board.counts()
      if (white === black) {
        return 'tie'
      }
      return white > black ? Token.White : Token.Black
    }
    return false
  }

  get board() {
    return this.board_ref
  }

  place(x: number, y: number): boolean {
    if (!this.valid(x, y)) {
      return false
    }
    this.capture(x, y)
    this.turn = this.other_turn()
    if (!this.check_have_turn()) {
      this.turn = this.other_turn()
      if (!this.check_have_turn()) {
        // Game Over!
        this.complete = true
        return true
      }
    }
    return true
  }

  valid(x: number, y: number): boolean {
    if (this.board.at(x, y) !== Token.Empty) {
      return false
    }

    for (let offset of this.board.pencil()) {
      let x_offset = x + offset[0]
      let y_offset = y + offset[1]
      if (this.board.valid(x_offset, y_offset)) {
        const offset_token = this.board.at(x_offset, y_offset)
        if (offset_token !== Token.Empty && offset_token !== this.turn) {
          for (let i = 1; i < 8; i++) {
            x_offset += offset[0]
            y_offset += offset[1]
            if (!this.board.valid(x_offset, y_offset)) {
              break
            }
            if (this.board.at(x_offset, y_offset) === Token.Empty) {
              break
            }
            if (this.board.at(x_offset, y_offset) === this.turn) {
              return true
            }
          }
        }
      }
    }
    return false
  }

  capture(x: number, y: number): void {
    this.board.board[x][y] = this.turn
    const toFlip = []

    for (let offset of this.board.pencil()) {
      const line = []
      let x_offset = x + offset[0]
      let y_offset = y + offset[1]
      for (let i = 1; i < 8; i++) {
        if (!this.board.valid(x_offset, y_offset)) {
          break
        }
        if (this.board.at(x_offset, y_offset) === this.other_turn()) {
          line.push([x_offset, y_offset])
        }

        if (this.board.at(x_offset, y_offset) === this.turn) {
          toFlip.push(line)
          break
        }

        if (this.board.at(x_offset, y_offset) === Token.Empty) {
          break
        }
        x_offset += offset[0]
        y_offset += offset[1]
      }
    }

    for (let captured of toFlip.flat(1)) {
      this.board.board[captured[0]][captured[1]] = this.turn
    }
  }

  check_have_turn(): boolean {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.valid(i, j)) {
          return true
        }
      }
    }
    return false
  }
}

class Board {
  board: Token[][]

  constructor() {
    this.board = []
    for (let i = 0; i < 8; i++) {
      this.board[i] = []
    }
    this.reset()
  }

  at(x: number, y: number): Token {
    return this.board[x][y]
  }

  reset(): void {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        this.board[i][j] = Token.Empty
      }
    }

    this.board[3][3] = Token.White
    this.board[3][4] = Token.Black
    this.board[4][3] = Token.Black
    this.board[4][4] = Token.White
  }

  valid(x: number, y: number): boolean {
    return (0 <= x && x < 8) && (0 <= y && y < 8)
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
    ]
  }

  counts(): [number, number] {
    let white = 0
    let black = 0
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.board[i][j] === Token.White) {
          white += 1
        }
        if (this.board[i][j] === Token.Black) {
          black += 1
        }
      }
    }

    return [white, black]
  }
}
