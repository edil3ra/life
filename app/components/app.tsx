import * as React from 'react'
import { BoardComponent } from './board'
import { PanelComponent } from './panel'
import { GliderComponent } from './glider'
import { HistoryComponent } from './history'
import { OptionComponent } from './option'
import { ICellProps, createCells, cellsCount, cellsCountLife, cellsLife, updateCells, simulate } from 'models/cell'
import { IPanelProps, IPanelState } from 'models/panel'


import { WIN_X, WIN_Y, CELL_COUNT, CELL_MIN_SCALE, CELL_MAX_SCALE } from 'config'


export interface AppState {
  cells: Array<ICellProps>,
  isGlider: boolean,
  isHistory: boolean,
  isOption: boolean,
}

export class AppComponent extends React.Component<any, AppState> {
  protected pausedInterval: number
  state: AppState

  constructor() {
    super()
    this.state = {
      cells: createCells(WIN_X, WIN_Y, CELL_COUNT),
      isHistory: false,
      isGlider: false,
      isOption: false,
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


  handleStart(event: any): void {
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


  handleOption(event: any): void {
    event.preventDefault()
    this.setState({ ...this.state, isOption: !this.state.isOption })
  }

  handleGlider(event: any): void {
    event.preventDefault()
    this.setState({ ...this.state, isGlider: !this.state.isGlider })
  }

  handleHistory(event: any): void {
    event.preventDefault()
    this.setState({ ...this.state, isHistory: !this.state.isHistory })
  }

  render() {
    const {
	  isGlider,
	  isHistory,
	  isOption,
	  cells,
	} = this.state


    const appStyle = {
      margin: `0px`,
      padding: `0px`,
      overflow: 'hidden' as 'hidden',
    }

    const mainStyle = {
      float: 'left',
    }

    const slideStyle = {
      float: 'left',
      marginLeft: '20px',
      overflow: 'hidden' as 'hidden',
    }

    const boardProps = {
      cells: cells,
      width: WIN_X,
      height: WIN_Y,
    }

    const panelProps: IPanelProps = {
      isStarted: this.pausedInterval > 0 ? true : false,
	  isGlider: isGlider,
	  isHistory: isHistory,
	  isOption: isOption,
      handleStart: this.handleStart.bind(this),
      handleOption: this.handleOption.bind(this),
      handleGlider: this.handleGlider.bind(this),
      handleHistory: this.handleHistory.bind(this),
    }


    return (
      <div style={appStyle}>
        <div style={mainStyle}>
          <BoardComponent {...boardProps} />
          <PanelComponent {...panelProps} />
        </div>
        <div style={slideStyle}>
          {isOption && <OptionComponent />}
          {isGlider && <GliderComponent />}
          {isHistory && <HistoryComponent />}
        </div>
      </div>
    );
  }
}
