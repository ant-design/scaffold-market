import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import ReactGA from 'react-ga';
import IntlCommonLayout from './Layout/IntlCommonLayout';
import IndexPage from './routes/IndexPage';
import Contribute from './routes/Contribute';
import ScaffoldPage from './routes/ScaffoldPage';

ReactGA.initialize('UA-72788897-4');

function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

function RouterConfig({ history }) {
  return (
    <Router history={history} onUpdate={logPageView}>
      <Route path="/" component={IntlCommonLayout}>
        <IndexRoute component={IndexPage} />
        <Route path="contribute" component={Contribute}>
          <Route path="finish" component={Contribute} />
        </Route>
        <Route path="scaffolds/:templateId" component={ScaffoldPage} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
