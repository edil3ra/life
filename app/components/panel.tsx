import * as React from 'react'
import { CELL_MIN_SCALE, CELL_MAX_SCALE } from '../config'
import { TPanelProps, TPanelState} from '../models/panel'
import { TStyle, styles } from '../utils'



export class PanelComponent extends React.Component<TPanelProps, TPanelState> {
  public state: TPanelState
  public props: TPanelProps
  constructor(props) {
    super(props)
    const startButtonColor = props.started ? styles.red : styles.green
    this.state = {
      styles: {
        restart: [styles.button, styles.blue, styles.restart],
        startPause: [styles.button, startButtonColor, styles.startPause],
        count: [styles.button, styles.count],
      }
    }
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
      styles.green : styles.red
    this.setState(cloned)
  }


  render() {
    const {
	  started,
      handleStart,
	} = this.props

    return (
      <div style={styles.panel}>
        <form>
          <button style={this.displayStyle(this.state.styles.startPause)}
            onMouseEnter={(_ => started ?
              this.appendStyle('startPause', styles.redHover) :
              this.appendStyle('startPause', styles.greenHover)
            )}
            onMouseLeave={(_ => this.removeStyle('startPause'))}
            onClick={(e) => {
              handleStart(e)
              this.changeStartPauseStyle(e)
            }}>
            {started ? "Paused" : "Start"}
          </button>
        </form>
      </div >
    )
  }
}
