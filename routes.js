import React, {Component} from 'react';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import App from './src/containers/app';
import Main from './src/components/main';
import Login from './src/components/login';
import ImportCompanies from './src/containers/ImportCompanies';
import Admin from './src/containers/Admin';

class Routes extends React.Component {

  render() {
    const history = syncHistoryWithStore(browserHistory, this.props.store);

    return (
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Main}/>
          <Route path="login" component={Login} />
          <Route path="ImportCompanies" component={ImportCompanies} />
          <Route path="Admin" component={Admin} />
        </Route>
      </Router>
    );
  }
}

export default Routes;
