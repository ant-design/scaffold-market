import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Contribute from './routes/Contribute';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/contribute" component={Contribute} />
    </Router>
  );
}

export default RouterConfig;
