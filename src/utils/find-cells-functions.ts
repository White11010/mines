import { ICell } from '@/models/cell.model'
import { deepCopyWithoutMethods } from '@/utils/object-functions'

export const getNeighborCellsList = (
  cellsList: Array<Array<ICell>>,
  cell: ICell,
  rowIndex: number,
  cellIndex: number,
  fieldWidth: number,
  fieldHeight: number
): Array<ICell> => {
  const neighborCellsList: Array<ICell> = []

  const cellsRow = cellsList[rowIndex]

  // upper row
  if (rowIndex - 1 >= 0) {
    if (cellIndex - 1 >= 0) {
      neighborCellsList.push(deepCopyWithoutMethods(cellsList[rowIndex - 1][cellIndex - 1]))
    }
    neighborCellsList.push(deepCopyWithoutMethods(cellsList[rowIndex - 1][cellIndex]))
    if (cellIndex + 1 < fieldWidth) {
      neighborCellsList.push(deepCopyWithoutMethods(cellsList[rowIndex - 1][cellIndex + 1]))
    }
  }

  // cell's row
  if (cellIndex - 1 >= 0) {
    neighborCellsList.push(deepCopyWithoutMethods(cellsRow[cellIndex - 1]))
  }
  if (cellIndex + 1 < fieldWidth) {
    neighborCellsList.push(deepCopyWithoutMethods(cellsRow[cellIndex + 1]))
  }

  // lower row
  if (rowIndex + 1 < fieldHeight) {
    if (cellIndex - 1 >= 0) {
      neighborCellsList.push(deepCopyWithoutMethods(cellsList[rowIndex + 1][cellIndex - 1]))
    }
    neighborCellsList.push(deepCopyWithoutMethods(cellsList[rowIndex + 1][cellIndex]))
    if (cellIndex + 1 < fieldWidth) {
      neighborCellsList.push(deepCopyWithoutMethods(cellsList[rowIndex + 1][cellIndex + 1]))
    }
  }

  return neighborCellsList
}

export const mutateNeighborCells = (
  cellsList: Array<Array<ICell>>,
  cell: ICell,
  rowIndex: number,
  cellIndex: number,
  fieldWidth: number,
  fieldHeight: number,
  callback: (cell: ICell) => void
): void => {
  const cellsRow = cellsList[rowIndex]

  // upper row
  if (rowIndex - 1 >= 0) {
    if (cellIndex - 1 >= 0) {
      callback(cellsList[rowIndex - 1][cellIndex - 1])
    }
    callback(cellsList[rowIndex - 1][cellIndex])
    if (cellIndex + 1 < fieldWidth) {
      callback(cellsList[rowIndex - 1][cellIndex + 1])
    }
  }

  // cell's row
  if (cellIndex - 1 >= 0) {
    callback(cellsRow[cellIndex - 1])
  }
  if (cellIndex + 1 < fieldWidth) {
    callback(cellsRow[cellIndex + 1])
  }

  // lower row
  if (rowIndex + 1 < fieldHeight) {
    if (cellIndex - 1 >= 0) {
      callback(cellsList[rowIndex + 1][cellIndex - 1])
    }
    callback(cellsList[rowIndex + 1][cellIndex])
    if (cellIndex + 1 < fieldWidth) {
      callback(cellsList[rowIndex + 1][cellIndex + 1])
    }
  }
}
