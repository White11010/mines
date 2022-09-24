<template>
  <div class="game">
    <MinesField
      :game-status="gameStatus"
      :mines-quantity="10"
      :width="10"
      :height="10"
      @change-game-state="onStateChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import MinesField from '@/components/MinesField/MinesField.vue'
import { TGameStatus } from '@/models/game-status.model'

const gameStatus = ref<TGameStatus>('not started')

const onStateChange = (status: TGameStatus) => {
  gameStatus.value = status
}
</script>

<style lang="scss" scoped>
.game {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
