import * as React from 'react'
import { CELL_MIN_SCALE, CELL_MAX_SCALE } from 'config'
import { IPanelProps, IPanelState } from 'models/panel'
import * as styles from 'styles'



export class PanelComponent extends React.Component<IPanelProps, IPanelState> {
  public state: IPanelState
  public props: IPanelProps
  constructor(props) {
    super(props)
    const startButtonColor = props.started ? styles.styles.red : styles.styles.green
    this.state = {
      styles: {
        start: [styles.styles.button, styles.styles.floatLeft, styles.styles.red],
        option: [styles.styles.button, styles.styles.smallButton, styles.styles.floatRight, styles.styles.red],
        glider: [styles.styles.button, styles.styles.smallButton, styles.styles.floatRight, styles.styles.red],
        history: [styles.styles.button, styles.styles.smallButton, styles.styles.floatRight, styles.styles.red],
      }
    }
  }



  handleMouseEnter(cond: boolean, key: string, styleTrue: styles.TStyle, styleFalse: styles.TStyle): void {
    const newStyles = cond ?
      styles.push(this.state.styles[key], styleTrue) :
      styles.push(this.state.styles[key], styleFalse)
    const cloned = { ...this.state }
    this.state.styles[key] = newStyles
    this.setState(cloned)
  }


  handleMouseOut(cond: boolean, key: string, styleTrue: styles.TStyle, styleFalse: styles.TStyle): void {
    const newStyles = cond ?
      styles.remove(this.state.styles[key], styleTrue) :
      styles.remove(this.state.styles[key], styleFalse)
    const cloned = { ...this.state }
    this.state.styles[key] = newStyles
    this.setState(cloned)
  }

  handleMouseClick(cond: boolean, key: string, styleTrue: styles.TStyle, styleFalse: styles.TStyle): void {
    const initialStyle = this.state.styles[key]
    const style1 = cond ?
      styles.remove(initialStyle, styleTrue) :
      styles.remove(initialStyle, styleFalse)

    const style2 = styles.remove(style1, styles.styles.redHover)
    const style3 = styles.remove(style2, styles.styles.greenHover)

    const style4 = cond ?
      styles.push(style3, styleFalse) :
      styles.push(style3, styleTrue)

    const cloned = { ...this.state }
    this.state.styles[key] = style4
    this.setState(cloned)
  }

  render() {
    const {
	  isStarted,
      isGlider,
      isHistory,
      isOption,
      handleStart,
      handleOption,
      handleGlider,
      handleHistory,
	} = this.props


    const renderStart = (
      <button style={styles.display(this.state.styles.start)}
        onMouseEnter={(_ => this.handleMouseEnter(isStarted, 'start', styles.styles.redHover, styles.styles.greenHover))}
        onMouseOut={(_ => this.handleMouseOut(isStarted, 'start', styles.styles.redHover, styles.styles.greenHover))}
        onClick={(e) => {
          handleStart(e)
          this.handleMouseClick(isStarted, 'start', styles.styles.red, styles.styles.green)
        }}>
        {isStarted ?
          <i className="fa fa-pause" aria-hidden="true"></i> :
          <i className="fa fa-play" aria-hidden="true"></i>
        }
      </button>
    )


    const renderOption = (
      <button style={styles.display(this.state.styles.option)}
        onMouseEnter={(_ => this.handleMouseEnter(isOption, 'option', styles.styles.redHover, styles.styles.greenHover))}
        onMouseOut={(_ => this.handleMouseOut(isOption, 'option', styles.styles.redHover, styles.styles.greenHover))}
        onClick={(e) => {
          handleOption(e)
          this.handleMouseClick(isOption, 'option', styles.styles.red, styles.styles.green)
        }}>
        <i className="fa fa-question" aria-hidden="true"></i>
      </button>
    )

	
    const renderGlider = (
      <button style={styles.display(this.state.styles.glider)}
        onMouseEnter={(_ => this.handleMouseEnter(isGlider, 'glider', styles.styles.redHover, styles.styles.greenHover))}
        onMouseOut={(_ => this.handleMouseOut(isGlider, 'glider', styles.styles.redHover, styles.styles.greenHover))}
        onClick={(e) => {
          handleGlider(e)
          this.handleMouseClick(isGlider, 'glider', styles.styles.red, styles.styles.green)
        }}>
        <i className="fa fa-th" aria-hidden="true"></i>
      </button>
    )

    const renderHistory = (
      <button style={styles.display(this.state.styles.history)}
        onMouseEnter={(_ => this.handleMouseEnter(isHistory, 'history', styles.styles.redHover, styles.styles.greenHover))}
        onMouseOut={(_ => this.handleMouseOut(isHistory, 'history', styles.styles.redHover, styles.styles.greenHover))}
        onClick={(e) => {
          handleHistory(e)
          this.handleMouseClick(isHistory, 'history', styles.styles.red, styles.styles.green)
        }}>
        <i className="fa fa-history " aria-hidden="true"></i>
      </button>
    )

    return (
      <div style={styles.styles.panel}>
        <form>
          {renderStart}
          {renderHistory}
          {renderGlider}
          {renderOption}
        </form>
      </div >
    )


  }

}
