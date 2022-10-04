<template>
  <div class="modal-container">
    <div class="modal">
      <h3 class="modal-title">{{props.title}}</h3>
      <div class="modal-actions">
        <slot name="actions">

        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface INotificationModalProps {
  title: string
}

const props = defineProps<INotificationModalProps>()
</script>

<style lang="scss" scoped>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal {
  width: min(100vw, 600px);
  height: min(100vh, 500px);
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 16px;
}

.modal-title {
  font-size: 32px;
  font-family: sans-serif;
}

.modal-actions {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
}
</style>
