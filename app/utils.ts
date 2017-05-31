export type TStyle = {
  panel: Object,
  button: Object,
  restart: Object,
  startPause: Object,
  count: Object,
  red: Object,
  green: Object,
  blue: Object,
  redHover: Object,
  greenHover: Object,
  blueHover: Object,
}

export const styles: TStyle  = {
  panel:{
	'margin': 'auto',
	'width': `500px`,
	'height': `50px`,
	'backgroundColor': `#efefef`,
	'overflow': 'hidden',
  },
  button: {
	'display': 'block',
	'height': '50px',
	'float': 'left',
	'margin': '0',
	'padding': '10px',
	'cursor': 'pointer',
	'fontSize': '1em',
	'color': '#ffffff',
	'border': 'none'
  },
  restart: {
  },
  startPause: {
	'marginLeft': '10px',
  },
  count: {
	'padding': '0px',
	'marginLeft': '10px',
  },
  red: {
	'color': '#ffffff',
	'backgroundColor': '#480000',
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
	'backgroundColor': '#940000',
  },
  greenHover: {
	'backgroundColor': '#009400',
  },
  blueHover: {
	'backgroundColor': '#000094',
  }
}


function displayStyles(style: Array<Object>): Object {
  return style.reduce((previous, current) => {
    return { ...previous, ...current }
  }, {})
}

function appendStyle(key: string, item: Object): void {
  const cloned = { ...this.state }
  cloned["styles"][key].push(item)
  this.setState(cloned)
}


