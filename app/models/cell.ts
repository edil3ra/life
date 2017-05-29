export type TCellProps = {
  width: number,
  height: number,
  left: number,
  top: number,
  life: boolean,
}



export function createCells(width, height, count): Array<TCellProps> {
  const sizeX: number = Math.sqrt(width * height / count)
  const sizeY: number = Math.sqrt(width * height / count)
  const countX: number = Math.sqrt(count)
  const countY: number = Math.sqrt(count)
  const cells = new Array<TCellProps>()

  // create the cells
  for (let i = 0; i < count; i++) {
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


export function cellsLife(cells: Array<TCellProps>): Array<boolean> {
  return cells.map((cell) => cell.life)
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


export function updateCells(cells: Array<TCellProps>, life: Array<boolean>): Array<TCellProps> {
  let cellsUpdated: Array<TCellProps> = new Array()
  for (let i = 0; i < cells.length; i++) {
    cellsUpdated.push({
	  ...cells[i], life: life[i]
    })
  }
  return cellsUpdated
}



export function simulate(cells: Array<TCellProps>): Array<TCellProps> {
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
  return updateCells(cells, lifesSimulate)
}

