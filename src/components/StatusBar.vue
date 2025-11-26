<template>
  <div class="status-bar">
    <p>Foo</p>
    <p>Foo</p>
    <p>Foo</p>
  </div>
</template>

<script setup lang="ts">
  import { inject } from 'vue';

  const game = inject('game')
  console.log(game.value.current_turn());
</script>
