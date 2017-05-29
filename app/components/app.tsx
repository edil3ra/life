import * as React from 'react'
import { BoardComponent } from './board'
import { TCellProps, createCells, cellsCount, cellsCountLife, cellsLife, updateCells} from '../models/cell'
import { WIN_X, WIN_Y, CELL_COUNT } from '../config'


export interface AppState {
  cells: Array<TCellProps>
}

export class AppComponent extends React.Component<any, AppState> {
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
    const appStyle = {
      margin: `0px`,
      padding: `0px`,
    };


    return (
      <div style={appStyle}>
        <BoardComponent cells={this.state.cells}/>
      </div>
    );
  }
}
