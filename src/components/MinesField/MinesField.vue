<template>
<div
  class="mines__field field"
>
  <MinesCell
    v-for="(cell, index) in cellsList.flat()"
    :key="index"
    v-bind="cell"
    @click="onCellClick"
  />
</div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import sampleSize from 'lodash.samplesize'
import MinesCell from '@/components/MinesCell/MinesCell.vue'
import { ICell, TCellNumber, TCellStatus, TCellValue } from '@/models/cell.model'
import { TGameStatus } from '@/models/game-status.model'
import { generateMines, generateNumbers } from '@/utils/generate-functions'

// props
interface IMinesFieldProps {
  gameStatus: TGameStatus,
  minesQuantity: number,
  width: number,
  height: number,
}
const props = defineProps<IMinesFieldProps>()

// emits
const emit = defineEmits(['changeGameState'])

// Cells state
const initialCellsList = Array.from({ length: props.width }, (v1, k1) => (
  Array.from({ length: props.height }, (v2, k2) => ({
    id: Number(`${k1}${k2}`),
    coords: {
      y: k1,
      x: k2
    },
    value: 'empty' as TCellValue,
    status: 'closed' as TCellStatus
  }))
))

const cellsList = reactive<Array<Array<ICell>>>(initialCellsList)

const onCellClick = (targetCell: ICell) => {
  if (props.gameStatus === 'pending') return

  if (props.gameStatus === 'not started') {
    generateMines(cellsList, targetCell)
    generateNumbers(cellsList, props.width, props.height)
    emit('changeGameState', 'playing')
    return
  }

  if (targetCell.status === 'closed') {
    // const cell = cellsList.find((cellsRow: ICell) => cell.id === targetCell.id);
  }
}
</script>

<style lang="scss" scoped>
.field {
  width: fit-content;
  display: grid;
  grid-template-columns: repeat(v-bind('props.width'), 30px);
  grid-template-rows: repeat(v-bind('props.height'), 30px);

  &__cell {
    width: 30px;
    height: 30px;
    box-sizing: border-box;
    border: 1px solid black;
  }
}
</style>
