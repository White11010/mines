<template>
  <div
    class="cell"
    :class="{
      'cell--closed': props.status === 'closed',
      'cell--mined': props.status === 'opened' && props.value === 'mine',
      'cell--opened': props.status === 'opened'
    }"
    @click.prevent="onClick"
    @contextmenu.prevent
  >
    <p
      v-if="typeof props.value === 'number'"
      class="cell__number"
    >
      {{ props.value }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { TCellStatus, TCellValue } from '@/models/cell.model'

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

const emit = defineEmits(['click'])

const onClick = () => {
  emit('click', props)
}
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

.cell--mined {
  background-color: red;
}

.cell--closed {
  background-color: lightgray;
  border: 2px outset black;
}

.cell--opened {
  background-color: #efeded;
  border: 2px solid black;
}

.cell__number {
  line-height: 100%;
  font-weight: 700;
  font-family: sans-serif;
}
</style>
