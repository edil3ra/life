import { TStyle } from 'styles'
import * as React from 'react'

export interface IPanelState {
  styles: {
    start: Array<TStyle>
    option: Array<TStyle>
    glider: Array<TStyle>
    history: Array<TStyle>
  }
}


export interface IPanelProps {
  isStarted: boolean
  isGlider: boolean
  isHistory: boolean
  isOption: boolean
  
  handleStart: (event: any) => void
  handleOption: (event: any) => void
  handleGlider: (event: any) => void
  handleHistory: (event: any) => void
}
