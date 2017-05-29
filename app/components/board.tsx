import * as React from 'react'
import { CellComponent } from './cell'


export interface BoardProps {
  cells: Array<TCellProps>,
  width: number,
  height: number
}


export class BoardComponent extends React.Component<BoardProps, any> {
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
