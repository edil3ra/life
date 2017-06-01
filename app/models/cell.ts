import { CELL_COLOR_LIFE, CELL_COLOR_DEATH, CELL_BORDER_BOTTOM, CELL_BORDER_RIGHT } from 'config'


export interface ICellProps {
  width: number
  height: number
  left: number
  top: number
  life: boolean
  colorLife: string
  colorDeath: string
  borderBottom: number
  borderRight: number
}

export type TCellPropsOptional = {
  [P in keyof ICellProps]?: ICellProps[P]
}

export function cellsCreate(width: number, height: number, count: number, random = false): Array<ICellProps> {
  const sizeX: number = Math.sqrt(width * height / count)
  const sizeY: number = Math.sqrt(width * height / count)
  const countX: number = Math.sqrt(count)
  const countY: number = Math.sqrt(count)
  const cells = new Array<ICellProps>()

  // create the cells
  for (let i = 0; i < count; i++) {
    const cellProps: ICellProps = {
      width: sizeX,
      height: sizeY,
      left: (i % countX) * sizeX,
      top: (Math.floor(i / countY)) * sizeY,
      life: random ? Math.random() <= 0.5: false,
      colorLife: CELL_COLOR_LIFE,
      colorDeath: CELL_COLOR_DEATH,
      borderBottom: CELL_BORDER_BOTTOM,
      borderRight: CELL_BORDER_RIGHT,
    }
    cells.push(cellProps)
  }
  return cells
}


export function cellsLife(cells: Array<ICellProps>): Array<boolean> {
  return cells.map((cell) => cell.life)
}

export function cellsChange(cells: Array<ICellProps>, cellUpdate: TCellPropsOptional): Array<ICellProps> {
  return cells.map((cell: ICellProps) => {
    return { ...cell, ...cellUpdate }
  })
}


export function cellsRandom(cells: Array<ICellProps>): Array<ICellProps> {
  return cells.map((cell: ICellProps) => {
    return { ...cell, ...{ life: Math.random() <= 0.5 } }
  })
}

export function cellsCount(cells: Array<boolean>): Array<number> {
  const offset = Math.sqrt(cells.length)

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


export function cellsCountLife(cells: Array<boolean>, counts: Array<number>): Array<any> {
  let lifesCounts: Array<any> = new Array()
  for (let i = 0; i < cells.length; i++) {
    lifesCounts.push({
      life: cells[i],
      count: counts[i]
    })
  }
  return lifesCounts
}


export function cellsUpdate(cells: Array<ICellProps>, life: Array<boolean>): Array<ICellProps> {
  let cellsUpdated: Array<ICellProps> = new Array()
  for (let i = 0; i < cells.length; i++) {
    cellsUpdated.push({
      ...cells[i], life: life[i]
    })
  }
  return cellsUpdated
}



export function simulate(cells: Array<ICellProps>): Array<ICellProps> {
  const lifes = cellsLife(cells)
  const counts = cellsCount(lifes)
  const countsLife = cellsCountLife(lifes, counts)
  const lifesSimulate = lifes.slice()


  countsLife.forEach(({ life, count }, index) => {
    if (life) {
      if (count <= 1) {
        lifesSimulate[index] = false
      }
      else if (count >= 4) {
        lifesSimulate[index] = false
      }
      else {
        lifesSimulate[index] = true
      }
    } else {
      if (count == 3) {
        lifesSimulate[index] = true
      }
      else {
        lifesSimulate[index] = false
      }
    }
  })
  return cellsUpdate(cells, lifesSimulate)
}

