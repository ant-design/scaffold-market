import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import IntlCommonLayout from './Layout/IntlCommonLayout';
import IndexPage from './routes/IndexPage';
import Contribute from './routes/Contribute';
import ScaffoldPage from './routes/ScaffoldPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IntlCommonLayout}>
        <IndexRoute component={IndexPage} />
        <Route path="contribute" component={Contribute}>
          <Route path="finish" component={Contribute} />
        </Route>
        <Route path="templates/:templateId" component={ScaffoldPage} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
