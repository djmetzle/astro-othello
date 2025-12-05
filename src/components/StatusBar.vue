<template>
  <div class="status-bar">
    <div class="token-status">
          <div class="token white" v-if="turn == Token.White"></div>
          <div class="token" v-if="turn == Token.Black"></div>
    </div>
    <p>{{counts[0]}}</p>
    <p v-if="winner === false">Othello</p>
    <p v-if="winner === 'tie'">TIED!</p>
    <p class="winner" v-if="winner === Token.White">White Wins!</p>
    <p v-if="winner === Token.Black">Black Wins!</p>
    <p>{{counts[1]}}</p>
    <div class="token-status">
          <div class="token" v-if="turn == Token.White"></div>
          <div class="token black" v-if="turn == Token.Black"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { inject, computed } from 'vue';
  import { Token } from '../Game.ts'

  const game = inject('game')
  const turn = computed(() => game.value.current_turn())
  const winner = computed(() => game.value.winner())
  const counts = computed(() => game.value.board.counts());
</script>
