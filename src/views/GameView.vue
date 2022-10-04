<template>
  <div class="game">
    <MinesField
      :key="gameKey"
      :game-status="gameStatus"
      :mines-quantity="10"
      :width="10"
      :height="10"
      @change-game-state="onStateChange"
    />
    <Transition>
      <NotificationModal
        v-if="gameStatus === 'lost'"
        title="You lost"
      >
        <template #actions>
          <button @click="restartGame">restart</button>
        </template>
      </NotificationModal>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ref } from 'vue'
import MinesField from '@/components/MinesField/MinesField.vue'
import { TGameStatus } from '@/models/game-status.model'
import NotificationModal from '@/components/NotificationModal/NotificationModal.vue'

const gameStatus = ref<TGameStatus>('not started')

const onStateChange = (status: TGameStatus) => {
  gameStatus.value = status
}

const gameKey = ref<number>(0)

const restartGame = () => {
  gameStatus.value = 'not started'
  gameKey.value++
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

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
