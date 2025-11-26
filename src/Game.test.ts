import { describe, expect, test } from 'vitest'
import { Game, Token } from './Game.ts'

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
})
