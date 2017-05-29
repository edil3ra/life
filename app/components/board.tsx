import * as React from 'react'
import { TCellProps, createCells, cellsCount, cellsCountLife, cellsLife, updateCells} from '../models/cell'
import { CellComponent } from './cell'
import { WIN_X, WIN_Y, CELL_COUNT } from '../config'


export interface BoardProps {
  cells: Array<TCellProps>
}


export class BoardComponent extends React.Component<BoardProps, any> {
  protected pausedInterval: number

  constructor() {
    super()
  }

  render() {
    const boardStyle = {
      position: 'relative' as 'relative',
      margin: 'auto',
      width: `${WIN_X}.px`,
      height: `${WIN_Y}.px`,
      backgroundColor: `#efefef`,
    };

    const boardStyleUl = {
      listStyleType: `none`,
      margin: `0`,
      padding: `0`,
    };


    const cells = this.props.cells.map((cell, i) => {
      return (
        <CellComponent {...cell} key={i} />
      )
    })


    return (
      <div style={boardStyle}>
        <ul style={boardStyleUl}>
          {cells}
        </ul>
      </div>
    );
  }
}
