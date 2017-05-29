import * as React from 'react'
import { CellComponent } from './cell'
import { TCellProps } from '../models/cell'

export type TBoardProps = {
  cells: Array<TCellProps>,
  width: number,
  height: number
}


export class BoardComponent extends React.Component<TBoardProps, any> {
  constructor() {
    super()
  }

  render() {
    const boardStyle = {
      position: 'relative' as 'relative',
      margin: 'auto',
      width: `${this.props.width}.px`,
      height: `${this.props.height}.px`,
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
