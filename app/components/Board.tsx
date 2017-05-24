import * as React from 'react'
import { Cell, ICellProps } from './Cell'
import { WIN_X, WIN_Y, CELL_COUNT } from '../config'


export interface BoardState {
  cells: Array<ICellProps>
}


export class Board extends React.Component<any, BoardState> {

  constructor() {
    super()
    this.state = {
      cells: this.createCells()
    }
  }

  protected createCells(): Array<ICellProps> {
    const sizeX: number = Math.sqrt(WIN_X * WIN_Y / CELL_COUNT)
    const sizeY: number = Math.sqrt(WIN_X * WIN_Y / CELL_COUNT)
    const countX: number = Math.sqrt(CELL_COUNT)
    const countY: number = Math.sqrt(CELL_COUNT)
    const cells = new Array<ICellProps>()
	
    // create the cells
    for (let i = 0; i < CELL_COUNT; i++) {
      const cellProps: ICellProps = {
        width: sizeX,
        height: sizeY,
        left: (i % countX) * sizeX,
        top: (Math.floor(i / countY)) * sizeY,
        life: Math.random() <= 0.5 ? false : true,
      }
      cells.push(cellProps)
    }
    return cells
  }

  render() {
    const boardStyle = {
      position: 'relative',
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


    const cells = this.state.cells.map((cell, i) => {
      return (
        <Cell {...cell} key={i} />
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
