import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { history } from './history';
import Redbox from 'redbox-react';
import Root from './Root';
import configureStore from './store/configureStore';

import 'sweetalert/dist/sweetalert.min.js';
import 'sweetalert/dist/sweetalert.css';
import 'jquery/dist/jquery.slim';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'styles/styles.scss';

const store = configureStore();

// Get the DOM Element that will host our React application
const rootEl = document.getElementById('app');

// Render the React application to the DOM
render(
  <AppContainer errorReporter={Redbox}>
    <Root store={store} history={history} />
  </AppContainer>,
  rootEl
);

if (module.hot) {
  /**
   * Warning from React Router, caused by react-hot-loader.
   * The warning can be safely ignored, so filter it from the console.
   * Otherwise you'll see it every time something changes.
   * See https://github.com/gaearon/react-hot-loader/issues/298
   */
   const orgError = console.error; // eslint-disable-line no-console
   console.error = (message) => { // eslint-disable-line no-console
     if (message && message.indexOf('You cannot change <Router routes>;') === -1) {
       // Log the error as normally
       orgError.apply(console, [message]);
     }
   };

  module.hot.accept('./Root', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./Root').default;

    render(
      <AppContainer errorReporter={Redbox}>
        <NextApp store={store} history={history} />
      </AppContainer>,
      rootEl
    );
  });
}
