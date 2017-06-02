import * as React from 'react'
import { BoardComponent } from './board'
import { PanelComponent } from './panel'
import { GliderComponent } from './glider'
import { HistoryComponent } from './history'
import { OptionComponent } from './option'
import { ICellProps, cellsCreate, cellsCount, cellsCountLife, cellsLife, cellsUpdate, simulate, cellsChange, cellsRandom } from 'models/cell'
import { IPanelProps, IPanelState } from 'models/panel'
import { styles } from 'styles'

import { WIN_X, WIN_Y, SPEED_INIT, SPEED_FACTOR, SPEED_MIN, SPEED_MAX, CELL_COUNT, CELL_SCALE, CELL_MIN_SCALE, CELL_MAX_SCALE, CELL_RANDOM } from 'config'


export interface AppState {
  cells: Array<ICellProps>,
  isGlider: boolean,
  isHistory: boolean,
  isOption: boolean,
  speed: number,
  scale: number,
}

export class AppComponent extends React.Component<any, AppState> {
  protected pausedInterval: number
  state: AppState

  constructor() {
    super()
    this.state = {
      cells: cellsCreate(WIN_X, WIN_Y, CELL_SCALE, CELL_RANDOM),
      isHistory: false,
      isGlider: false,
      isOption: false,
      scale: CELL_SCALE,
      speed: SPEED_INIT
    }

    this.handleStart = this.handleStart.bind(this)
    this.handleOption = this.handleOption.bind(this)
    this.handleGlider = this.handleGlider.bind(this)
    this.handleHistory = this.handleHistory.bind(this)
    this.handleDead = this.handleDead.bind(this)
    this.handleLife = this.handleLife.bind(this)
    this.handleRandom = this.handleRandom.bind(this)
    this.handleSimulate = this.handleSimulate.bind(this)
    this.handleSizeDecrease = this.handleSizeDecrease.bind(this)
    this.handleSizeIncrease = this.handleSizeIncrease.bind(this)
    this.handleDecelerate = this.handleDecelerate.bind(this)
    this.handleAccelerate = this.handleAccelerate.bind(this)
  }


  protected start(): any {
    this.pausedInterval = setInterval(() => {
      this.update()
    }, this.state.speed * 1000)
  }


  protected restart(): any {
	clearInterval(this.pausedInterval)
    this.pausedInterval = setInterval(() => {
      this.update()
    }, this.state.speed * 1000)
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


  handleAccelerate(event: any): void {
    event.preventDefault()
    const speed = this.state.speed - SPEED_FACTOR > SPEED_MAX ?
      this.state.speed : this.state.speed - SPEED_FACTOR

    this.setState({ ...this.state, speed: speed })
	this.restart()
	this.forceUpdate()
  }

  handleDecelerate(event: any): void {
    event.preventDefault()
    const speed = this.state.speed + SPEED_FACTOR < SPEED_MIN ?
      this.state.speed : this.state.speed + SPEED_FACTOR

    this.setState({ ...this.state, speed: speed })
	this.restart()
	this.forceUpdate()
  }

  handleSizeIncrease(event: any): void {
    event.preventDefault()
    const scale = this.state.scale + 1 > CELL_MAX_SCALE ?
      this.state.scale : this.state.scale + 1

    this.setState({ ...this.state, scale: scale, cells: cellsCreate(WIN_X, WIN_Y, scale, true) })
  }

  handleSizeDecrease(event: any): void {
    event.preventDefault()
    const scale = this.state.scale - 1 < CELL_MIN_SCALE ?
      this.state.scale : this.state.scale - 1
    this.setState({ ...this.state, scale: scale, cells: cellsCreate(WIN_X, WIN_Y, scale, true) })

  }



  handleSimulate(event: any): void {
    event.preventDefault()
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
      handleDecelerate: this.handleDecelerate,
      handleAccelerate: this.handleAccelerate,
      handleSizeIncrease: this.handleSizeIncrease,
      handleSizeDecrease: this.handleSizeDecrease,
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
