<template>
  <div
    class="cell"
    :class="{
    'cell--mined': props.value === 'mine'
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
  background-color: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cell--mined {
  background-color: red;
}

.cell__number {
  line-height: 100%;
  font-weight: 700;
  font-family: sans-serif;
}
</style>
