import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import CommonLayout from './Layout/CommonLayout';
import IndexPage from './routes/IndexPage';
import Contribute from './routes/Contribute';
import ScaffoldPage from './routes/ScaffoldPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={CommonLayout}>
        <IndexRoute component={IndexPage} />
        <Route path="contribute" component={Contribute} />
        <Route path="templates/:templateId" component={ScaffoldPage} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
