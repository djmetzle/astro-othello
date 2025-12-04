import { describe, expect, test } from 'vitest'
import { Game, Token } from './Game.ts'

function clearBoard(game: Game) {
  game.board.board[3][3] = Token.Empty
  game.board.board[3][4] = Token.Empty
  game.board.board[4][3] = Token.Empty
  game.board.board[4][4] = Token.Empty
}

describe('Game', () => {
  test('init', () => {
    const game = new Game()
    expect(game.current_turn()).toBe(Token.White)
    expect(game.board.at(0, 0)).toBe(Token.Empty)
    expect(game.board.at(7, 7)).toBe(Token.Empty)

    expect(game.board.at(3, 3)).toBe(Token.White)
    expect(game.board.at(3, 4)).toBe(Token.Black)
    expect(game.board.at(4, 3)).toBe(Token.Black)
    expect(game.board.at(4, 4)).toBe(Token.White)
  })

  describe('rules', () => {
    test('invalid moves', () => {
      const game = new Game()
      expect(game.current_turn()).toBe(Token.White)
      expect(game.place(0, 0)).toBe(false)
      expect(game.place(3, 3)).toBe(false)
      expect(game.place(2, 5)).toBe(false)
      expect(game.current_turn()).toBe(Token.White)
    })

    test('simple adjacent', () => {
      const game = new Game()
      expect(game.board.at(3, 4)).toBe(Token.Black)
      expect(game.place(2, 4)).toBe(true)
      expect(game.board.at(2, 4)).toBe(Token.White)
      // Flipped
      expect(game.board.at(3, 4)).toBe(Token.White)
    })

    test('lines', () => {
      const game = new Game()
      game.board.board[3][5] = Token.Black
      expect(game.board.at(3, 4)).toBe(Token.Black)
      expect(game.board.at(3, 5)).toBe(Token.Black)

      expect(game.place(3, 6)).toBe(true)

      expect(game.board.at(3, 6)).toBe(Token.White)
      // Flipped
      expect(game.board.at(3, 4)).toBe(Token.White)
      expect(game.board.at(3, 5)).toBe(Token.White)
    })

    test('lines connected', () => {
      const game = new Game()
      clearBoard(game)
      game.board.board[4][4] = Token.White
      game.board.board[5][5] = Token.Black
      game.board.board[7][5] = Token.White
      game.board.board[7][6] = Token.Black

      expect(game.place(7, 7)).toBe(true)
      expect(game.board.at(5, 5)).toBe(Token.Black)
    })

    test('when no moves', () => {
      const game = new Game()
      clearBoard(game)

      game.board.board[0][1] = Token.Black
      game.board.board[1][0] = Token.Black
      game.board.board[0][2] = Token.White

      expect(game.current_turn()).toBe(Token.White)
      expect(game.place(0, 0)).toBe(true)
      // Skipped
      expect(game.current_turn()).toBe(Token.White)
    })

    test('full line', () => {
      const game = new Game()
      clearBoard(game)

      game.board.board[0][0] = Token.White

      for (let i = 1; i < 7; i++) {
        game.board.board[0][i] = Token.Black
      }

      expect(game.current_turn()).toBe(Token.White)
      expect(game.place(0, 7)).toBe(true)
      expect(game.current_turn()).toBe(Token.White)

      for (let i = 0; i <= 7; i++) {
        expect(game.board.at(0, i)).toBe(Token.White)
      }
    })
  })

  describe('winner', () => {
    test('game in progress', () => {
      const game = new Game()
      expect(game.winner()).toBe(false)
    })

    test('white wins', () => {
      const game = new Game()
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          game.board.board[i][j] = Token.White
        }
      }
      game.complete = true
      expect(game.winner()).toBe(Token.White)
    })

    test('black wins', () => {
      const game = new Game()
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          game.board.board[i][j] = Token.Black
        }
      }
      game.complete = true
      expect(game.winner()).toBe(Token.Black)
    })

    test('tie', () => {
      const game = new Game()
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 8; j++) {
          game.board.board[i][j] = Token.White
        }
      }
      for (let i = 4; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          game.board.board[i][j] = Token.Black
        }
      }
      game.complete = true
      expect(game.winner()).toBe('tie')
    })
  })
})
