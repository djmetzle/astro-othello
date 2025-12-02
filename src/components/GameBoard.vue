<template>
    <div class="game-board">
      <div class="gamerow" v-for="(row, i) in game.board.board" :data-i="i">
      <div class="gamecell" v-for="(cell, j) in row" :data-i="i" :data-j="j" @click="clickHandler">
          <div class="token white" v-if="cell == Token.White"></div>
          <div class="token black" v-if="cell == Token.Black"></div>
          <div class="token" v-if="cell == Token.Empty"></div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
  import { inject, triggerRef } from 'vue'
  import { Token } from '../Game.ts'

  const game = inject('game')

  function clickHandler(event) {
    const i = parseInt(event.currentTarget.getAttribute('data-i'))
    const j = parseInt(event.currentTarget.getAttribute('data-j'))
    if (game.value.place(i, j)) {
      triggerRef(game)
    }
  }
</script>
