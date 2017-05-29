import * as React from 'react'
import { BoardComponent } from './board'
import { TCellProps, createCells, cellsCount, cellsCountLife, cellsLife, updateCells, simulate } from '../models/cell'
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



  protected update() {
    const cells = simulate(this.state.cells)
    this.setState({ cells: cells })
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
        <BoardComponent
          cells={this.state.cells}
          width={WIN_X}
          height={WIN_Y}
        />
      </div>
    );
  }
}
