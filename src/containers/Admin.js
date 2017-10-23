import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentCategories } from '../actions/categories';
import { fetchCurrentSalesmen } from '../actions/salesmen';
import { fetchCurrentStatuses } from '../actions/statuses';
import { fetchCurrentUsers } from '../actions/admin/users';
import _ from 'lodash';
import { Table, Button, Input, PanelGroup, Panel } from 'react-bootstrap';
import Salesmen from '../components/Admin/Salesmen';
import Statuses from '../components/Admin/Statuses';
import Categories from '../components/Admin/Categories';
import Users from '../components/Admin/Users';
import Groups from '../components/Admin/Groups';
import ResetStatuses from '../components/Admin/ResetStatuses';


class Admin extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrentCategories());
    dispatch(fetchCurrentSalesmen());
    dispatch(fetchCurrentStatuses());
    dispatch(fetchCurrentUsers());
  }

  render() {
    const { dispatch, loaded } = this.props;

    if(!loaded) {
      return(<div>Loading</div>);
    }

    return (
      <PanelGroup style={{ padding: 20 }}>
        <Panel header="+ Notendur" collapsible>
          <Users />
        </Panel>
        <Panel header="+ Sölumenn" collapsible>
          <Salesmen />
        </Panel>
        <Panel header="+ Flokkar" collapsible>
          <Categories />
        </Panel>
        <Panel header="+ Stöður" collapsible>
          <Statuses />
        </Panel>
        <Panel header="+ Flokkar" collapsible>
          <Groups />
        </Panel>
        <Panel header="+ Núlstilla stöður" collapsible>
          <ResetStatuses />
        </Panel>
      </PanelGroup>
    );
  }
}

function mapStateToProps(state) {
  var categories = state.categories.items;
  var salesmen = state.salesmen.items;
  var statuses = state.statuses.items;
  var users = state.users.items;

  let loaded = false;

  if(state.categories.loaded &&
     state.salesmen.loaded &&
     state.statuses.loaded &&
     state.users.loaded
   ) {
    loaded = true;
  }

  return { loaded, categories, salesmen, statuses }
}

export default connect(mapStateToProps)(Admin);
