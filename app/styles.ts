export interface IStyle {
  app: Object
  main: Object
  slide: Object
  panel: (background: string) => Object
  button: Object
  count: Object
  red: Object
  green: Object
  blue: Object
  redHover: Object
  greenHover: Object
  blueHover: Object
  floatLeft: Object
  floatRight: Object
  smallButton: Object
  mediumButton: Object
  largeButton: Object
  marginButton: Object
  wrapperDeadLife: Object
  deadButton: Object
  lifeButton: Object
  wrapperPlusMinus: Object
  plusButton: Object
  minusButton: Object
  boardF: (width: number, height: number, background: string) => Object
  boardUl: Object
  cellF: (width: number, height: number, left: number, top: number,
		  background: string, borderRight?:number, borderBottom?:number) => Object 
}

export const styles: IStyle = {

  app: {
    'margin': `0px`,
    'padding': `0px`,
    'overflow': 'hidden' as 'hidden',
  },

  main: {
	'float': 'left'
  },
  
  slide: {
    'float': 'left',
    'marginLeft': '20px',
    'overflow': 'hidden' as 'hidden',
  },
  
  panel(background: string): Object {
	return {
      'margin': 'auto',
      'width': `500px`,
      'height': `50px`,
      'backgroundColor': background,
      'overflow': 'hidden',	  
	}
  },
  
  button: {
    'display': 'block',
    'height': '50px',
    'width': '100px',
    'margin': '0',
    'padding': '10px',
    'cursor': 'pointer',
    'fontSize': '1em',
    'color': '#ffffff',
    'border': 'none'
  },
  smallButton: {
    'width': '50px',
  },
  mediumButton: {
    'width': '100px',
  },
  largeButton: {
    'width': '150px',
  },
  marginButton: {
	'marginRight': '2px',
  },

  wrapperDeadLife: {
	'float': 'left',
	'overflow': 'hidden',
	'position': 'relative',
	'width': '25px',
	'height': '50px',
  },
  
  deadButton: {
	'position': 'absolute',
	'height': '24px',
	'width': '24px',
	'left': 0,
	'top': 0,
  },

  lifeButton: {
	'position': 'absolute',
	'left': 0,
	'top': '26px',
	'height': '24px',
	'width': '24px',
  },



  wrapperPlusMinus: {
	'float': 'left',
	'overflow': 'hidden',
	'position': 'relative',
	'width': '25px',
	'height': '50px',
  },
  
  plusButton: {
	'position': 'absolute',
	'height': '24px',
	'width': '24px',
	'left': 0,
	'top': 0,
	'margin': '0',
    'cursor': 'pointer',
	'border': 'none'
  },

  minusButton: {
	'position': 'absolute',
	'left': 0,
	'top': '26px',
	'height': '24px',
	'width': '24px',
	'margin': '0',
    'cursor': 'pointer',
	'border': 'none'
  },

  
  
  boardF(width: number, height: number, background: string): Object {
    return {
      'position': 'relative' as 'relative',
      'margin': 'auto',
      'width': `${width}.px`,
      'height': `${height}.px`,
      'backgroundColor': `${background}`,
    }
  },

  boardUl: {
    'listStyleType': `none`,
    'margin': `0`,
    'padding': `0`,
  },

  cellF(width: number, height: number, left: number, top: number,
    background: string, borderRight = 0, borderBottom = 0): Object {
    return {
      'position': 'absolute' as 'absolute',
      'width': `${width - borderRight}px`,
      'height': `${height - borderBottom}px`,
      'left': `${left}px`,
      'top': `${top}px`,
      'backgroundColor': `${background}`,
    }
  },

  count: {
    'padding': '0px',
    'marginLeft': '10px',
  },
  red: {
    'color': '#ffffff',
    'backgroundColor': '#940000',
  },
  green: {
    'color': '#ffffff',
    'backgroundColor': '#00C717',
    'textShadow': '-1px 1px #002E00',
  },
  blue: {
    'color': '#ffffff',
    'backgroundColor': '#1B00C7',
    'textShadow': '-1px 1px #000061',
  },
  redHover: {
    'backgroundColor': '#480000',
  },
  greenHover: {
    'backgroundColor': '#009400',
  },
  blueHover: {
    'backgroundColor': '#000094',
  },
  floatRight: {
    'float': 'right',
  },
  floatLeft: {
    'float': 'left',
  },
}


export type TStyle = {[P in keyof IStyle]?: IStyle[P]}
export type TStyleKey = {[P in keyof IStyle]: P}


export function display(styles: Array<TStyle>): Object {
  return styles.reduce((previous, current) => {
    return { ...previous, ...current }
  }, {})
}

export function push(styles: Array<TStyle>, style: TStyle): Array<TStyle> {
  return styles.concat([style])
}

export function pop(styles: Array<TStyle>): Array<TStyle> {
  return styles.slice(0, -1)
}

export function remove(styles: Array<TStyle>, style: TStyle): Array<TStyle> {
  const index = styles.indexOf(style)
  const start = styles.slice(0, index)
  const end = styles.slice(index + 1)
  const result = index == -1 ? styles : [...start, ...end]
  return result
}

