<template>
  <div class="game-frame">
    <StatusBar />
    <GameBoard />
  </div>
</template>

<script setup lang="ts">
  import { provide, ref } from 'vue'
  import StatusBar from './StatusBar.vue'
  import GameBoard from './GameBoard.vue'

  import {Game} from '../Game.ts'

  const game = ref(new Game());
  provide('game', game);
</script>
