<template>
    <div class="game-board">
      <div class="gamerow" v-for="row in game.board.board">
        <div class="gamecell" v-for="cell in row"> 
          <div class="token white" v-if="cell == Token.White"></div>
          <div class="token black" v-if="cell == Token.Black"></div>
          <div class="token" v-if="cell == Token.Empty"></div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
  import { inject } from 'vue'
  import { Token } from '../Game.ts'

  const game = inject('game')
  console.log(game.value.board);
</script>
