import { TStyle } from '../utils'
import * as React from 'react'

export type TPanelState = {
  styles: {
    restart: Array<Object>
    startPause: Array<Object>
    count: Array<Object>
  }
}


export type TPanelProps = {
  started: boolean,
  handleStart: (event: any) => void
  handleOption: (event: any) => void
  handleGlider: (event: any) => void
  handleHistory: (event: any) => void
}
