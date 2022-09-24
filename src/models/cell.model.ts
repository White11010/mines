export type TCellNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type TCellValue = 'empty' | 'mine' | TCellNumber;

export type TCellStatus = 'closed' | 'opened' | 'flagged';

export interface ICell {
  id: number,
  coords: {
    x: number,
    y: number,
  };
  value: TCellValue;
  status: TCellStatus;
}
