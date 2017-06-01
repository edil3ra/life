import * as React from 'react'
import { BoardComponent } from './board'
import { PanelComponent } from './panel'
import { GliderComponent } from './glider'
import { HistoryComponent } from './history'
import { OptionComponent } from './option'
import { ICellProps, cellsCreate, cellsCount, cellsCountLife, cellsLife, cellsUpdate, simulate, cellsChange, cellsRandom } from 'models/cell'
import { IPanelProps, IPanelState } from 'models/panel'
import { styles } from 'styles'

import { WIN_X, WIN_Y, CELL_COUNT, CELL_MIN_SCALE, CELL_MAX_SCALE, CELL_RANDOM } from 'config'


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
      cells: cellsCreate(WIN_X, WIN_Y, CELL_COUNT, CELL_RANDOM),
      isHistory: false,
      isGlider: false,
      isOption: false,
    }

    this.handleStart = this.handleStart.bind(this)
    this.handleOption = this.handleOption.bind(this)
    this.handleGlider = this.handleGlider.bind(this)
    this.handleHistory = this.handleHistory.bind(this)
    this.handleDead = this.handleDead.bind(this)
    this.handleLife = this.handleLife.bind(this)
    this.handleRandom = this.handleRandom.bind(this)
    this.handleSimulate = this.handleSimulate.bind(this)
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
      cells: cellsCreate(WIN_X, WIN_Y, Math.pow(event.target.value, 2))
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


  handleLife(event: any): void {
    event.preventDefault()
    this.setState({
      ...this.state,
      cells: cellsChange(this.state.cells, { life: true })
    })
  }

  handleDead(event: any): void {
    event.preventDefault()
    this.setState({
      ...this.state,
      cells: cellsChange(this.state.cells, { life: false })
    })
  }

  handleRandom(event: any): void {
    event.preventDefault()
    this.setState({
      ...this.state,
      cells: cellsRandom(this.state.cells)
    })
  }

  handleSimulate(event: any): void {
    event.preventDefault()
    // this.setState({
    //   ...this.state,
    //   cells: cellsRandom(this.state.cells)
    // })
	// console.log('thueon')
	this.pause()
    this.forceUpdate()
	
	
  }


  render() {
    const {
	  isGlider,
      isHistory,
      isOption,
      cells,
	} = this.state


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
      colorDeath: cells[0].colorDeath,
      colorLife: cells[0].colorLife,
      handleStart: this.handleStart,
      handleOption: this.handleOption,
      handleGlider: this.handleGlider,
      handleHistory: this.handleHistory,
      handleDead: this.handleDead,
      handleLife: this.handleLife,
      handleSimulate: this.handleSimulate,
      handleRandom: this.handleRandom,
    }


    return (
      <div style={styles.app}>
        <div style={styles.main}>
          <BoardComponent {...boardProps} />
          <PanelComponent {...panelProps} />
        </div>
        <div style={styles.slide}>
          {isOption && <OptionComponent />}
          {isGlider && <GliderComponent />}
          {isHistory && <HistoryComponent />}
        </div>
      </div>
    );
  }
}
