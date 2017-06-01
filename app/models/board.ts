import { ICellProps } from 'models/cell'

export interface IBoardProps {
  cells: Array<ICellProps>
  width: number
  height: number
}
