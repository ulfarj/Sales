import React, {Component} from 'react';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import App from './src/containers/app';
import Main from './src/components/main';
import Login from './src/components/login';

class Routes extends React.Component {

  render() {
    const history = syncHistoryWithStore(browserHistory, this.props.store);

    return (
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Main}/>
          <Route path="login" component={Login} />
        </Route>
      </Router>
    );
  }
}

export default Routes;
