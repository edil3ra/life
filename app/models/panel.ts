import { TStyle } from 'styles'
import * as React from 'react'

export interface IPanelState {
  styles: {
    start: Array<TStyle>
  }
}


export interface IPanelProps {
  started: boolean,
  handleStart: (event: any) => void
  handleOption: (event: any) => void
  handleGlider: (event: any) => void
  handleHistory: (event: any) => void
}
