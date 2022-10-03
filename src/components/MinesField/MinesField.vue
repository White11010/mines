<template>
  <div
    class="mines__field field"
  >
    <MinesCell
      v-for="(cell, index) in cellsList.flat()"
      :key="index"
      v-bind="cell"
      @click:left="onCellClick"
      @click:right="onCellRightClick"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import MinesCell from '@/components/MinesCell/MinesCell.vue'
import { ICell, TCellStatus, TCellValue } from '@/models/cell.model'
import { TGameStatus } from '@/models/game-status.model'
import { generateMines, generateNumbers } from '@/utils/generate-functions'
import { mutateNeighborCells } from '@/utils/find-cells-functions'

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
    cellsList[targetCell.coords.y][targetCell.coords.x].status = 'opened'
    if (cellsList[targetCell.coords.y][targetCell.coords.x].value === 'empty') openEmptyArea(targetCell)
    return
  }

  if (targetCell.status === 'closed') {
    cellsList[targetCell.coords.y][targetCell.coords.x].status = 'opened'
    if (targetCell.value === 'empty') openEmptyArea(targetCell)
  }
}

const onCellRightClick = (targetCell: ICell) => {
  if (targetCell.status === 'closed') {
    cellsList[targetCell.coords.y][targetCell.coords.x].status = 'flagged'
  }
}

const openEmptyArea = (startEmptyCell: ICell) => {
  const cb = (cell: ICell) => {
    if (cell.status === 'opened') return

    cell.status = 'opened'

    if (cell.value === 'empty') {
      mutateNeighborCells(
        cellsList,
        cell,
        cell.coords.y,
        cell.coords.x,
        props.width,
        props.height,
        cb)
    }
  }

  mutateNeighborCells(
    cellsList,
    startEmptyCell,
    startEmptyCell.coords.y,
    startEmptyCell.coords.x,
    props.width,
    props.height,
    cb
  )
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
