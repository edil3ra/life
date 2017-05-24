import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { App } from './components/App'


if (module.hot) {
  module.hot.accept();
}

const load = () => {
  ReactDOM.render(
    <App />,
    document.querySelector('#app')
  );
};

if (document.readyState !== 'complete') {
  document.addEventListener('DOMContentLoaded', load);
} else {
  load();
}



