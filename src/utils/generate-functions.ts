import { ICell, TCellNumber } from '@/models/cell.model'
import sampleSize from 'lodash.samplesize'
import { getNeighborCellsList } from '@/utils/find-cells-functions'

// mutates original cells array
const generateMines = (cellsList: Array<Array<ICell>>, exceptedCell: ICell): void => {
  const flattedCellsListWithoutExcepted = cellsList.flat().filter((cell: ICell) => cell.id !== exceptedCell.id)
  console.log(flattedCellsListWithoutExcepted.length)

  const cellsWithMinesList = sampleSize(flattedCellsListWithoutExcepted, 10)

  cellsWithMinesList.forEach((cell: ICell) => {
    cellsList[cell.coords.y][cell.coords.x].value = 'mine'
  })
}

// mutates original cells array
const generateNumbers = (cellsList: Array<Array<ICell>>, fieldWidth: number, fieldHeight: number): void => {
  cellsList.forEach((cellsRow: Array<ICell>, rowIndex: number) => {
    cellsRow.forEach((cell: ICell, cellIndex: number) => {
      if (cell.value === 'mine') return

      const neighborCellsList = getNeighborCellsList(
        cellsList,
        cell,
        rowIndex,
        cellIndex,
        fieldWidth,
        fieldHeight
      )

      const minesCount: number = neighborCellsList.reduce((minesCount, cell) => {
        if (cell.value === 'mine') return ++minesCount
        return minesCount
      }, 0)

      if (minesCount !== 0) {
        cellsList[rowIndex][cellIndex].value = minesCount as TCellNumber
      }
    })
  })
}

export {
  generateMines,
  generateNumbers
}
