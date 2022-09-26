import { ICell, TCellNumber } from '@/models/cell.model'
import sampleSize from 'lodash.samplesize'

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

      let minesCounter = 0

      if (rowIndex - 1 >= 0) {
        if (cellIndex - 1 >= 0 && cellsList[rowIndex - 1][cellIndex - 1].value === 'mine') minesCounter++
        if (cellsList[rowIndex - 1][cellIndex].value === 'mine') minesCounter++
        if (cellIndex + 1 < fieldWidth && cellsList[rowIndex - 1][cellIndex + 1].value === 'mine') minesCounter++
      }

      if (cellIndex - 1 >= 0 && cellsRow[cellIndex - 1].value === 'mine') minesCounter++
      if (cellIndex + 1 < fieldWidth && cellsRow[cellIndex + 1].value === 'mine') minesCounter++

      if (rowIndex + 1 < fieldHeight) {
        if (cellIndex - 1 >= 0 && cellsList[rowIndex + 1][cellIndex - 1].value === 'mine') minesCounter++
        if (cellsList[rowIndex + 1][cellIndex].value === 'mine') minesCounter++
        if (cellIndex + 1 < fieldWidth && cellsList[rowIndex + 1][cellIndex + 1].value === 'mine') minesCounter++
      }

      if (minesCounter !== 0) {
        console.log(cellsList[rowIndex][cellIndex].value)
        cellsList[rowIndex][cellIndex].value = minesCounter as TCellNumber
      }
    })
  })
}

export {
  generateMines,
  generateNumbers
}
