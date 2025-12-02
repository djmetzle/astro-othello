<template>
  <div class="status-bar">
    <div class="token-status">
          <div class="token white" v-if="turn == Token.White"></div>
          <div class="token" v-if="turn == Token.Black"></div>
    </div>
    <p>Othello</p>
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
</script>
