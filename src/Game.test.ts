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

  describe('placement', () => {
    test('basics', () => {
      const game = new Game()
      expect(game.current_turn()).toBe(Token.White)
      expect(game.place(0, 0)).toBe(false)
      expect(game.current_turn()).toBe(Token.White)
      expect(game.place(3, 3)).toBe(false)
      expect(game.current_turn()).toBe(Token.White)

      expect(game.place(2, 4)).toBe(true)
      expect(game.board.at(2, 4)).toBe(Token.White)
      expect(game.current_turn()).toBe(Token.Black)
    })

    test('rules', () => {
      const game = new Game()
      expect(game.place(2, 5)).toBe(false)
    })
  })

  describe('reversi', () => {
    test('simple adjacent', () => {
      const game = new Game()
      expect(game.place(2, 4)).toBe(true)
      expect(game.board.at(2, 4)).toBe(Token.White)
      // Should flip
      expect(game.board.at(3, 4)).toBe(Token.Black)
    })
  })
})
