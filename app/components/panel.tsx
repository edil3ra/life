import * as React from 'react'
import { CELL_MIN_SCALE, CELL_MAX_SCALE } from '../config'


type Styles = {
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


type TPanelState = {
  styles: {
    restart: Array<Styles>
    startPause: Array<Styles>
    count: Array<Styles>
  }
}


type TPanelProps = {
  started: Boolean,
  countMin: number,
  countMax: number,
  countCurrent: number,
  handleRestart: (event: EventListener) => void
  handleSartPause: (event: EventListener) => void
  handleCount: (event: EventListener) => void
}

export class PanelComponent extends React.Component<TPanelProps, TPanelState> {
  protected styles: Styles

  constructor(props) {
    super(props)
    this.styles = this.initStyles()
    console.log(props.started)
    const startButtonColor = props.started ? this.styles.red : this.styles.green
    this.state = {
      styles: {
        restart: [this.styles.button, this.styles.blue, this.styles.restart],
        startPause: [this.styles.button, startButtonColor, this.styles.startPause],
        count: [this.styles.button, this.styles.count],
      }
    }
  }




  protected initStyles(): Styles {
    const styles: Styles = {
      panel: {
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
    return styles
  }

  protected displayStyle(style: Array<Object>): Object {
    return style.reduce((previous, current) => {
      return { ...previous, ...current }
    }, {})
  }

  protected appendStyle(key: string, item: Object): void {
    const cloned = { ...this.state }
    cloned["styles"][key].push(item)
    this.setState(cloned)
  }

  protected removeStyle(key: string): void {
    const cloned = { ...this.state }
    cloned['styles'][key].pop()
    this.setState(cloned)
  }

  protected changeStartPauseStyle(event: any): void {
	event.preventDefault()
	const cloned = { ...this.state }
	cloned['styles']['startPause'][1] = this.props.started ?
	  this.styles.green : this.styles.red
	this.setState(cloned)
  }
  

  render() {
    const {
	  started,
      countMin,
      countMax,
      countCurrent,
      handleRestart,
      handleStartPause,
      handleCount
	} = this.props

    return (
      <div style={this.styles.panel}>
        <form>
          <button style={this.displayStyle(this.state.styles.restart)}
            onMouseEnter={(_ => this.appendStyle('restart', this.styles.blueHover))}
            onMouseLeave={(_ => this.removeStyle('restart'))}
            onClick={handleRestart}
          >
            Restart
          </button>
          <button style={this.displayStyle(this.state.styles.startPause)}
            onMouseEnter={(_ => started ?
              this.appendStyle('startPause', this.styles.redHover) :
              this.appendStyle('startPause', this.styles.greenHover)
            )}
            onMouseLeave={(_ => this.removeStyle('startPause'))}
            onClick={(e) => {
              handleStartPause(e)
			  this.changeStartPauseStyle(e)
            }}>
            {started ? "Paused" : "Start"}
          </button>
          <input
            style={{ ...this.styles.button, ...this.styles.count }}
            type="range"
            min={countMin}
            max={countMax}
            value={countCurrent}
            step={1}
            onChange={handleCount} />
        </form>
      </div >
    )
  }
}
