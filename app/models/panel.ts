import { TStyle } from 'styles'
import * as React from 'react'

export interface IPanelState {
  styles: IPanelStyle
}
export interface IPanelStyle {
  start: Array<TStyle | Object>,
  option: Array<TStyle | Object>,
  glider: Array<TStyle | Object>,
  history: Array<TStyle | Object>,
  life: Array<TStyle | Object>,
  dead: Array<TStyle | Object>,
  random: Array<TStyle | Object>
  simulate: Array<TStyle | Object>
  speedDecrease: Array<TStyle | Object>
  speedIncrease: Array<TStyle | Object>
}



export interface IPanelProps {
  isStarted: boolean
  isGlider: boolean
  isHistory: boolean
  isOption: boolean
  colorDeath: string
  colorLife: string
  handleStart: (event: any) => void
  handleOption: (event: any) => void
  handleGlider: (event: any) => void
  handleHistory: (event: any) => void
  handleLife: (event: any) => void
  handleDead: (event: any) => void
  handleRandom: (event: any) => void
  handleSimulate: (event: any) => void
  handleDecelerate: (event: any) => void
  handleAccelerate: (event: any) => void
  handleSizeIncrease: (event: any) => void
  handleSizeDecrease: (event: any) => void
}
