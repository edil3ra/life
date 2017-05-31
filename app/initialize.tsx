import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { AppComponent } from 'components/app'


if (module.hot) {
  module.hot.accept();
}

const load = () => {
  ReactDOM.render(
    <AppComponent />,
    document.querySelector('#app')
  );
};

if (document.readyState !== 'complete') {
  document.addEventListener('DOMContentLoaded', load);
} else {
  load();
}



