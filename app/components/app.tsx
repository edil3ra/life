import * as React from 'react'
import { BoardComponent } from './board'
import { PanelComponent } from './panel'
import { TCellProps, createCells, cellsCount, cellsCountLife, cellsLife, updateCells, simulate } from '../models/cell'
import { WIN_X, WIN_Y, CELL_COUNT, CELL_MIN_SCALE, CELL_MAX_SCALE } from '../config'


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
	this.pausedInterval = 0
  }



  protected update() {
    const cells = simulate(this.state.cells)
    this.setState({ cells: cells })
  }

  componentWillMount() {
    this.start()
  }


  handleRestart(event: any): void {
	event.preventDefault()
	this.setState({
	  ...this.state,
	  cells: createCells(WIN_X, WIN_Y, Math.floor(this.state.cells.length))
	})
  }

  handleStartPause(event: any): void {
	event.preventDefault()
	this.pausedInterval == 0 ? this.start() : this.pause()
	this.forceUpdate()
  }

  handleCount(event: any): void {
	event.preventDefault()
	this.setState({
	  ...this.state,
	  cells: createCells(WIN_X, WIN_Y, Math.pow(event.target.value, 2))
	})
  }
  
  render() {
    const appStyle = {
      margin: `0px`,
      padding: `0px`,
    }

	const boardProps = {
	  cells: this.state.cells,
      width: WIN_X,
      height: WIN_Y,
	}
	
	const panelProps = {
	  started: this.pausedInterval > 0 ? true : false ,
	  countMin: CELL_MIN_SCALE,
	  countMax: CELL_MAX_SCALE,
	  countCurrent: Math.floor(Math.pow(this.state.cells.length, 0.5)) ,
	  handleRestart: this.handleRestart.bind(this),
	  handleStartPause: this.handleStartPause.bind(this),
	  handleCount: this.handleCount.bind(this),
	}
	
    return (
      <div style={appStyle}>
        <BoardComponent {...boardProps} />
		<PanelComponent {...panelProps}/>
      </div>
    );
  }
}
