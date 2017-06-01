import * as React from 'react'
import { ICellProps } from 'models/cell'
import { styles } from 'styles'


export class CellComponent extends React.Component<ICellProps, any> {
  constructor(props: ICellProps) {
    super(props)
  }

  render() {
    const { width, height, left, top, life, colorLife, colorDeath, borderBottom, borderRight } = this.props
	const cellStyle = styles.cellF(width, height, left, top, life ? colorLife : colorDeath, borderBottom, borderRight)
    return (
      <li style={cellStyle}></li>
    )
  }
}
