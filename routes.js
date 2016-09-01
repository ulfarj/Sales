import React, {Component} from 'react';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import moment from 'moment';
import App from './src/containers/app';
import Main from './src/components/main';
import Login from './src/components/login';
import ImportCompanies from './src/containers/ImportCompanies';
import Admin from './src/containers/Admin';
import { authenticated, notAuthenticated } from './src/actions/account';

class Routes extends React.Component {

  authenticate = (nextState, replace) => {
    const { dispatch } = this.props.store;

    if (!(localStorage.token && moment() < moment(localStorage.expires))) {
      dispatch(notAuthenticated());
      replace({ pathname: '/login', state: { nextPathname: nextState.location.pathname } });
    } else {
      dispatch(authenticated({
        userName: localStorage.userName,
        token: localStorage.token,
      }));
    }
  }

  render() {
    const history = syncHistoryWithStore(browserHistory, this.props.store);
    //onEnter={this.authenticate}

    return (
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Main} />
          <Route path="ImportCompanies" component={ImportCompanies} />
          <Route path="Admin" component={Admin} />
        </Route>
        <Route path="Login" component={Login} />
      </Router>
    );
  }
}

export default Routes;
