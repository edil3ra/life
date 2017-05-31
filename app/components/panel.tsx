import * as React from 'react'
import { CELL_MIN_SCALE, CELL_MAX_SCALE } from 'config'
import { IPanelProps, IPanelState} from 'models/panel'
import * as styles from 'styles'



export class PanelComponent extends React.Component<IPanelProps, IPanelState> {
  public state: IPanelState
  public props: IPanelProps
  constructor(props) {
    super(props)
    const startButtonColor = props.started ? styles.red : styles.green
    this.state = {
      styles: {
        start: [styles.button, styles.blue, styles.restart],
      }
    }
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
    cloned['styles']['start'][1] = this.props.started ?
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
          <button style={styles.display(this.state.styles.start)}
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
