import React, {Component} from 'react';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import moment from 'moment';
import App from './src/containers/app';
import Main from './src/components/main';
import Login from './src/components/login';
import Reports from './src/containers/Reports';
import ImportFG from './src/containers/import/ImportFG';
import Admin from './src/containers/Admin';
import { authenticated, notAuthenticated } from './src/actions/account';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { updateSize } from './src/actions/common';

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
          {/* <Route path="ImportFG" component={ImportFG} /> */}
          <Route path="Admin" component={Admin} />
        </Route>
        <Route path="Login" component={Login} />
        <Route path="reports" component={Reports} />
      </Router>
    );
  }
}

export default Routes;
