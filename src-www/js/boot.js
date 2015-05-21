import React from 'react';
import action from './actions/AppActionCreator';
import routes from './views/Main';
import Router from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
React.initializeTouchEvents(true);

import 'normalize.css/normalize.css';
import 'font-awesome/less/font-awesome.less';
import '../less/style.less';

action.init();

let run = () => {
  Router.run(routes, (Handler) => {
    React.render(<Handler />, document.body);
  });
}

if (typeof cordova === 'undefined') {
  run();
} else {
  document.addEventListener('deviceready', run);
}

