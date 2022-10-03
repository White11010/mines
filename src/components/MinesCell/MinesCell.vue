<template>
  <div
    class="cell"
    :class="props.status === 'closed' ? 'cell--closed' : 'cell--opened'"
    @click.prevent="onLeftClick"
    @contextmenu.prevent="onRightClick"
  >
    <p
      v-if="showImage"
      class="cell__image"
    >
      {{ getCellImage }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { TCellStatus, TCellValue } from '@/models/cell.model'
import { computed } from 'vue'

interface IMinesCellProps {
  id: number,
  value: TCellValue,
  status: TCellStatus
  coords: {
    x: number,
    y: number,
  }
}

const props = defineProps<IMinesCellProps>()

const emit = defineEmits(['click:left', 'click:right'])

const onLeftClick = () => {
  emit('click:left', props)
}

const onRightClick = () => {
  emit('click:right', props)
}

const showImage = computed(() => {
  return props.status === 'opened' || props.status === 'flagged'
})

const getCellImage = computed(() => {
  if (props.status === 'flagged') return 'F'
  if (props.value === 'empty') return ''
  if (props.value === 'mine') return 'M'
  return props.value
})
</script>

<style lang="scss" scoped>
.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  box-sizing: border-box;

}

.cell--closed {
  background-color: lightgray;
  border: 2px outset black;
}

.cell--opened {
  background-color: #efeded;
  border: 1px inset #5d5c5c;
}

.cell__image {
  line-height: 100%;
  font-weight: 700;
  font-family: sans-serif;
}
</style>
