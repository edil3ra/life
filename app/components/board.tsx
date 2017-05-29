import * as React from 'react'
import { TCellProps, createCells, cellsCount, cellsCountLife, cellsLife, updateCells} from '../models/cell'
import { CellComponent } from './cell'
import { WIN_X, WIN_Y, CELL_COUNT } from '../config'


export interface BoardState {
  cells: Array<TCellProps>
}


export class BoardComponent extends React.Component<any, BoardState> {
  protected pausedInterval: number

  constructor() {
    super()
    this.state = {
      cells: createCells(WIN_X, WIN_Y, CELL_COUNT)
    }
  }


  protected start(): any {
    this.pausedInterval = setInterval(() => {
      this.update()
    }, 1000)
  }

  protected pause(): any {
    clearInterval(this.pausedInterval)
  }



  protected simulate(cells: Array<TCellProps>): Array<TCellProps>{
    const lifes = cellsLife(cells)
    const counts = cellsCount(lifes)
    const countsLife = cellsCountLife(lifes, counts)
	const lifesSimulate = lifes.slice()


	
	countsLife.forEach(({life, count}, index) => {
	  if(life) {
		if(count <= 1) {
		  lifesSimulate[index] = false
		}
		else if(count >= 4) {
		  lifesSimulate[index] = false
		}
		else {
		  lifesSimulate[index] = true
		}
	  } else {
		if(count == 3) {
		  lifesSimulate[index] = true
		}
		else {
		  lifesSimulate[index] = false
		}
	  }
	})
	return updateCells(cells, lifesSimulate)
  }



  protected update() {
	const cells = this.simulate(this.state.cells)
	this.setState({cells: cells})
  }




  componentWillMount() {
    this.start()
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


    const cells = this.state.cells.map((cell, i) => {
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
