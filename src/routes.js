import React, {Component} from 'react';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import moment from 'moment';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './containers/app';
import Main from './components/main';
import Login from './components/login';
import Reports from './containers/Reports';
import Admin from './containers/Admin';
import { authenticated, notAuthenticated } from './actions/account';
import { updateSize } from './actions/common';

class Routes extends React.Component {

  componentWillMount = () => {
    injectTapEventPlugin();
    this.handleResize();
    window.addEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    const { dispatch } = this.props.store;
    dispatch(updateSize(window.innerWidth, window.innerHeight));
  };

  authenticate = (nextState, replace) => {
    const { dispatch } = this.props.store;

    if (!(sessionStorage.token && moment() < moment(sessionStorage.expires))) {
      dispatch(notAuthenticated());
      replace({ pathname: '/login', state: { nextPathname: nextState.location.pathname } });
    } else {
      dispatch(authenticated({
        userName: sessionStorage.userName,
        token: sessionStorage.token,
      }));
    }
  }

  render() {
    const history = syncHistoryWithStore(browserHistory, this.props.store);
    return (
      <Router history={history}>
        <Route path="/" component={App} onEnter={this.authenticate}>
          <IndexRoute component={Main} />
          <Route path="Admin" component={Admin} />
        </Route>
        <Route path="Login" component={Login} />
        <Route path="reports" component={Reports} />
      </Router>
    );
  }
}

export default Routes;
