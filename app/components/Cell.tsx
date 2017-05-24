import * as React from 'react'

export interface ICellProps {
  width: number
  height: number
  left: number
  top: number
  life: boolean
}



export class Cell extends React.Component<ICellProps, any> {
  constructor(props: ICellProps) {
    super(props)
  }
  
  render() {
	const {width, height, left, top, life} = this.props
	

	
    const cellStyle = {
	  position: 'absolute',
	  width: `${width}px`,
	  height: `${height}px`,
	  left: `${left}px`,
	  top: `${top}px`,
      backgroundColor: life ? `green` : `red`,
    };

	
	
    return (
		<li style={cellStyle}></li>
    )
  }
}
