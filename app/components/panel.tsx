import * as React from 'react'
import { CELL_MIN_SCALE, CELL_MAX_SCALE } from 'config'
import { IPanelProps, IPanelState } from 'models/panel'
import * as styles from 'styles'
import { PANEL_COLOR } from 'config'


export class PanelComponent extends React.Component<IPanelProps, IPanelState> {
  public state: IPanelState
  public props: IPanelProps

  constructor(props: IPanelProps) {
    super(props)
    const { button, floatLeft, floatRight, green, red, blue, smallButton, marginButton, deadButton, lifeButton, wrapperDeadLife, plusButton, minusButton } = styles.styles


    const startButtonColor = props.isStarted ? red : green
    const glidertButtonColor = props.isGlider ? green : red
    const historyButtonColor = props.isHistory ? green : red
    const optionButtonColor = props.isOption ? green : red


    this.state = {
      styles: {
        start: [button, floatLeft, startButtonColor, marginButton],
        option: [button, smallButton, floatRight, optionButtonColor, marginButton],
        glider: [button, smallButton, floatRight, glidertButtonColor, marginButton],
        history: [button, smallButton, floatRight, historyButtonColor],
        random: [button, smallButton, floatLeft, blue, marginButton],
        simulate: [button, smallButton, floatLeft, blue, marginButton],
        dead: [button, smallButton, deadButton, floatLeft, { backgroundColor: props.colorDeath }],
        life: [button, smallButton, lifeButton, floatLeft, { backgroundColor: props.colorLife }],
        speedDecrease: [minusButton, floatLeft, blue],
        speedIncrease: [plusButton, floatLeft, blue]
      }
    }
  }


  handleMouseEnterButton(key: string, style: styles.TStyle): void {
    const newStyles = styles.push(this.state.styles[key], style)
    const cloned = { ...this.state }
    this.state.styles[key] = newStyles
    this.setState(cloned)
  }

  handleMouseOutButton(key: string, style: styles.TStyle): void {
    const newStyles = styles.remove(this.state.styles[key], style)
    const cloned = { ...this.state }
    this.state.styles[key] = newStyles
    this.setState(cloned)
  }


  handleMouseEnterButtonToggle(cond: boolean, key: string, styleTrue: styles.TStyle, styleFalse: styles.TStyle): void {
    const newStyles = cond ?
      styles.push(this.state.styles[key], styleTrue) :
      styles.push(this.state.styles[key], styleFalse)
    const cloned = { ...this.state }
    this.state.styles[key] = newStyles
    this.setState(cloned)
  }


  handleMouseOutButtonToggle(cond: boolean, key: string, styleTrue: styles.TStyle, styleFalse: styles.TStyle): void {
    const newStyles = cond ?
      styles.remove(this.state.styles[key], styleTrue) :
      styles.remove(this.state.styles[key], styleFalse)
    const cloned = { ...this.state }
    this.state.styles[key] = newStyles
    this.setState(cloned)
  }

  handleMouseClickButtonToggle(cond: boolean, key: string, styleTrue: styles.TStyle, styleFalse: styles.TStyle): void {

    let style = this.state.styles[key]
    style = cond ?
      styles.remove(style, styleTrue) :
      styles.remove(style, styleFalse)

    style = styles.remove(style, styles.styles.redHover)
    style = styles.remove(style, styles.styles.greenHover)

    style = cond ?
      styles.push(style, styleFalse) :
      styles.push(style, styleTrue)

    let cloned = { ...this.state }
    this.state.styles[key] = style
    this.setState(cloned)
  }

  render() {
    const {
	  isStarted,
      isGlider,
      isHistory,
      isOption,
      colorDeath,
      colorLife,
      handleStart,
      handleOption,
      handleGlider,
      handleHistory,
      handleDead,
      handleLife,
      handleRandom,
      handleSimulate,
      handleAccelerate,
      handleDecelerate,
      handleSizeDecrease,
      handleSizeIncrease,
	} = this.props


    const { green, red, redHover, greenHover, blue, blueHover, wrapperDeadLife, wrapperPlusMinus } = styles.styles
    const panelStyle = styles.styles.panel(PANEL_COLOR)


    const renderStart = (
      <button style={styles.display(this.state.styles.start)}
        onMouseEnter={(_ => this.handleMouseEnterButtonToggle(isStarted, 'start', redHover, greenHover))}
        onMouseLeave={(_ => this.handleMouseOutButtonToggle(isStarted, 'start', redHover, greenHover))}
        onClick={(e) => {
          handleStart(e)
          this.handleMouseClickButtonToggle(isStarted, 'start', red, green)
        }}>
        {isStarted ?
          <i className="fa fa-pause" aria-hidden="true"></i> :
          <i className="fa fa-play" aria-hidden="true"></i>
        }
      </button>
    )


    const renderOption = (
      <button style={styles.display(this.state.styles.option)}
        onMouseEnter={(_ => this.handleMouseEnterButtonToggle(isOption, 'option', greenHover, redHover))}
        onMouseLeave={(_ => this.handleMouseOutButtonToggle(isOption, 'option', greenHover, redHover))}
        onClick={(e) => {
          handleOption(e)
          this.handleMouseClickButtonToggle(isOption, 'option', green, red)
        }}>
        <i className="fa fa-question" aria-hidden="true"> </i>
      </button>
    )


    const renderGlider = (
      <button style={styles.display(this.state.styles.glider)}
        onMouseEnter={(_ => this.handleMouseEnterButtonToggle(isGlider, 'glider', greenHover, redHover))}
        onMouseLeave={(_ => this.handleMouseOutButtonToggle(isGlider, 'glider', greenHover, redHover))}
        onClick={(e) => {
          handleGlider(e)
          this.handleMouseClickButtonToggle(isGlider, 'glider', green, red)
        }}>
        <i className="fa fa-th" aria-hidden="true"></i>
      </button>
    )

    const renderHistory = (
      <button style={styles.display(this.state.styles.history)}
        onMouseEnter={(_ => this.handleMouseEnterButtonToggle(isHistory, 'history', greenHover, redHover))}
        onMouseLeave={(_ => this.handleMouseOutButtonToggle(isHistory, 'history', greenHover, redHover))}
        onClick={(e) => {
          handleHistory(e)
          this.handleMouseClickButtonToggle(isHistory, 'history', green, red)
        }}>
        <i className="fa fa-history " aria-hidden="true"></i>
      </button>
    )


    const renderRandom = (
      <button style={styles.display(this.state.styles.random)}
        onClick={(e) => {
          handleRandom(e)
        }}
        onMouseEnter={(_ => this.handleMouseEnterButton('random', blueHover))}
        onMouseLeave={(_ => this.handleMouseOutButton('random', blueHover))}
      >
        <i className="fa fa-random" aria-hidden="true"></i>
      </button>
    )


    const renderSimulate = (
      <button style={styles.display(this.state.styles.simulate)}
        onClick={(e) => {
          handleSimulate(e)
        }}
        onMouseEnter={(_ => this.handleMouseEnterButton('simulate', blueHover))}
        onMouseLeave={(_ => this.handleMouseOutButton('simulate', blueHover))}
      >
        <i className="fa fa-arrow-right" aria-hidden="true"></i>
      </button>
    )

    const renderDead = (
      <button style={styles.display(this.state.styles.dead)}
        onClick={(e) => {
          handleDead(e)
        }}>
      </button>
    )

    const renderLife = (
      <button style={styles.display(this.state.styles.life)}
        onClick={(e) => {
          handleLife(e)
        }}>
      </button>
    )


    const renderSizeIncrease = (
      <button style={styles.display(this.state.styles.speedIncrease)}
        onClick={(e) => {
          handleSizeIncrease(e)
        }}>
        <i className="fa fa-plus" aria-hidden="true"></i>
      </button>
    )


    const renderSizeDecrease = (
      <button style={styles.display(this.state.styles.speedDecrease)}
        onClick={(e) => {
          handleSizeDecrease(e)
        }}>
        <i className="fa fa-minus" aria-hidden="true"></i>
      </button>
    )

    const renderAccelerate = (
      <button style={styles.display(this.state.styles.speedIncrease)}
        onClick={(e) => {
          handleAccelerate(e)
        }}>
        <i className="fa fa-forward" aria-hidden="true"></i>
      </button>
    )

    const renderDecelerate = (
      <button style={styles.display(this.state.styles.speedDecrease)}
        onClick={(e) => {
          handleDecelerate(e)
        }}>
        <i className="fa fa-backward" aria-hidden="true"></i>
      </button>
    )



    return (
      <div style={panelStyle}>
        <form>
          {renderStart}
          <div>
            {renderHistory}
            {renderGlider}
            {renderOption}
          </div>
          <div>
            {renderRandom}
            <div style={wrapperDeadLife}>
              {renderDead}
              {renderLife}
            </div>
            <div style={wrapperPlusMinus}>
              {renderSizeDecrease}
              {renderSizeIncrease}
            </div>
            <div style={wrapperPlusMinus}>
              {renderDecelerate}
              {renderAccelerate}
            </div>
          </div>
        </form>
      </div >
    )
  }
}
