import * as React from 'react'
import { CellComponent, TCellProps } from './cell'
import { WIN_X, WIN_Y, CELL_COUNT } from '../config'


export interface BoardState {
  cells: Array<TCellProps>
}


export class BoardComponent extends React.Component<any, BoardState> {
  protected pausedInterval: number

  constructor() {
    super()
    this.state = {
      cells: this.createCells()
    }
  }

  protected createCells(): Array<TCellProps> {
    const sizeX: number = Math.sqrt(WIN_X * WIN_Y / CELL_COUNT)
    const sizeY: number = Math.sqrt(WIN_X * WIN_Y / CELL_COUNT)
    const countX: number = Math.sqrt(CELL_COUNT)
    const countY: number = Math.sqrt(CELL_COUNT)
    const cells = new Array<TCellProps>()

    // create the cells
    for (let i = 0; i < CELL_COUNT; i++) {
      const cellProps: TCellProps = {
        width: sizeX,
        height: sizeY,
        left: (i % countX) * sizeX,
        top: (Math.floor(i / countY)) * sizeY,
        life: Math.random() <= 0.5 ? false : true,
      }
      cells.push(cellProps)
    }
    return cells
  }

  protected start(): any {
    this.pausedInterval = setInterval(() => {
      this.update()
    }, 1000)
  }

  protected pause(): any {
    clearInterval(this.pausedInterval)
  }

  protected cellsLife(cells: Array<TCellProps>): Array<boolean> {
    return cells.map((cell) => cell.life)
  }

  protected cellsCount(cells: Array<boolean>): Array<number> {
    const offset = Math.sqrt(CELL_COUNT)

    return cells
      .map((cell, index) => {
        const left = cells[index - 1] || false
        const right = cells[index + 1] || false
        const up = cells[index - offset] || false
        const down = cells[index + offset] || false
        const leftUp = cells[index - offset - 1] || false
        const rightUp = cells[index - offset + 1] || false
        const leftDown = cells[index + offset - 1] || false
        const rightDown = cells[index + offset + 1] || false

        return [left, right, up, down, leftUp, leftDown, rightUp, rightDown]
          .reduce((previous, current) => {
            return current ? previous + 1 : previous
          }, 0)
      })
  }

  protected cellsCountLife(cells: Array<boolean>, counts: Array<number>):
    Array<any> {
    let lifesCounts: Array<any> = new Array()
    for (let i = 0; i < cells.length; i++) {
      lifesCounts.push({
        life: cells[i],
        count: counts[i]
      })
    }
    return lifesCounts
  }

  protected updateCells(cells: Array<TCellProps>, life: Array<boolean>): Array<TCellProps> {
    let cellsUpdated: Array<TCellProps> = new Array()
    for (let i = 0; i < cells.length; i++) {
      cellsUpdated.push({
		...cells[i], life: life[i]
      })
    }
	return cellsUpdated
  }



  protected simulate(cells: Array<TCellProps>): Array<TCellProps>{
    const lifes = this.cellsLife(cells)
    const counts = this.cellsCount(lifes)
    const countsLife = this.cellsCountLife(lifes, counts)
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
	return this.updateCells(cells, lifesSimulate)
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
