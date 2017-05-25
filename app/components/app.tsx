import * as React from 'react'
import { BoardComponent } from './board'


export class AppComponent extends React.Component<any, any> {
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
        <BoardComponent />
      </div>
    );
  }
}
