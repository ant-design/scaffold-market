import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Contribute from './routes/Contribute';
import CommonLayout from './Layout/CommonLayout';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={CommonLayout}>
        <IndexRoute component={IndexPage} />
        <Route path="contribute" component={Contribute} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
