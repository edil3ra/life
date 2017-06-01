import * as React from 'react'
import { CellComponent } from './cell'
import { ICellProps } from '../models/cell'
import { IBoardProps } from '../models/board'
import { styles } from 'styles'


export class BoardComponent extends React.Component<IBoardProps, any> {
  public props: IBoardProps
  constructor(props) {
    super(props)
	
  }

  render() {
	const boardStyle = styles.boardF(this.props.width, this.props.height, `#efefef`)
    const boardStyleUl = styles.boardUl


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
