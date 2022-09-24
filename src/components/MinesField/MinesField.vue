<template>
<div
  class="mines__field field"
>
  <MinesCell
    v-for="(cell, index) in cellsList.flat()"
    :key="index"
    v-bind="cell"
    class="field__cell"
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

const generateMines = (exceptedCell: ICell) => {
  const flattedCellsListWithoutExcepted = cellsList.flat().filter((cell: ICell) => cell.id !== exceptedCell.id)

  const cellsWithMinesList = sampleSize(flattedCellsListWithoutExcepted, 10)

  cellsWithMinesList.forEach((cell: ICell) => {
    cellsList[cell.coords.y][cell.coords.x].value = 'mine'
  })
}

const generateNumbers = () => {
  cellsList.forEach((cellsRow: Array<ICell>, rowIndex: number) => {
    cellsRow.forEach((cell: ICell, cellIndex: number) => {
      if (cell.value === 'mine') return

      let minesCounter = 0

      if (rowIndex - 1 >= 0) {
        if (cellIndex - 1 >= 0 && cellsList[rowIndex - 1][cellIndex - 1].value === 'mine') minesCounter++
        if (cellsList[rowIndex - 1][cellIndex].value === 'mine') minesCounter++
        if (cellIndex + 1 < props.width && cellsList[rowIndex - 1][cellIndex + 1].value === 'mine') minesCounter++
      }

      if (cellIndex - 1 >= 0 && cellsRow[cellIndex - 1].value === 'mine') minesCounter++
      if (cellIndex + 1 < props.width && cellsRow[cellIndex + 1].value === 'mine') minesCounter++

      if (rowIndex + 1 < props.height) {
        if (cellIndex - 1 >= 0 && cellsList[rowIndex + 1][cellIndex - 1].value === 'mine') minesCounter++
        if (cellsList[rowIndex + 1][cellIndex].value === 'mine') minesCounter++
        if (cellIndex + 1 < props.width && cellsList[rowIndex + 1][cellIndex + 1].value === 'mine') minesCounter++
      }

      if (minesCounter !== 0) {
        console.log(cellsList[rowIndex][cellIndex].value)
        cellsList[rowIndex][cellIndex].value = minesCounter as TCellNumber
      }
    })
  })
}

const onCellClick = (cell: ICell) => {
  if (props.gameStatus === 'pending') return

  if (props.gameStatus === 'not started') {
    generateMines(cell)
    generateNumbers()
    emit('changeGameState', 'playing')
    return
  }

  console.log(cell)
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
