import * as React from 'react'
import { ICellProps } from 'models/cell'



export class CellComponent extends React.Component<ICellProps, any> {
  constructor(props: ICellProps) {
    super(props)
  }
  
  render() {
	const {width, height, left, top, life, colorAlive, colorDeath} = this.props
	
    const cellStyle = {
	  position: 'absolute' as 'absolute',
	  width: `${width - 1}px`,
	  height: `${height - 1}px`,
	  left: `${left}px`,
	  top: `${top}px`,
      backgroundColor: life ? colorDeath : colorAlive,
    };
	

    return (
		<li style={cellStyle}></li>
    )
  }
}
