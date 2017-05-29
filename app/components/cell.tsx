import * as React from 'react'
import { TCellProps } from '../models/cell'



export class CellComponent extends React.Component<TCellProps, any> {
  constructor(props: TCellProps) {
    super(props)
  }
  
  render() {
	const {width, height, left, top, life} = this.props
	
    const cellStyle = {
	  position: 'absolute' as 'absolute',
	  width: `${width - 1}px`,
	  height: `${height - 1}px`,
	  left: `${left}px`,
	  top: `${top}px`,
      backgroundColor: life ? `green` : `red`,
    };

	

    return (
		<li style={cellStyle}></li>
    )
  }
}
