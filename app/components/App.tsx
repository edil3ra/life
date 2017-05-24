import * as React from 'react'
import { Board } from './Board'


export class App extends React.Component<any, any> {
  constructor() {
    super()
  }

  render() {
    const appStyle = {
      margin: `0px`,
      padding: `0px`,
    };


    return (
      <div style={appStyle}>
        <Board />
      </div>
    );
  }
}
