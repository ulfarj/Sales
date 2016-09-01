import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentCategories } from '../actions/categories';
import { fetchCurrentSalesmen } from '../actions/salesmen';
import { fetchCurrentStatuses } from '../actions/statuses';
import { fetchCurrentUsers } from '../actions/admin/users';
import _ from 'lodash';
import { Table, Button, Input } from 'react-bootstrap';
import Salesmen from '../components/Admin/Salesmen';
import Statuses from '../components/Admin/Statuses';
import Categories from '../components/Admin/Categories';
import Users from '../components/Admin/Users';


class Admin extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrentCategories());
    dispatch(fetchCurrentSalesmen());
    dispatch(fetchCurrentStatuses());
    //dispatch(fetchCurrentUsers());
  }

  render() {
    const { dispatch, loaded } = this.props;

    if(!loaded) {
      return(<div>Loading</div>);
    }

    return (
      <div>
        {/*<div>
          <Users />
        </div>*/}
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <Salesmen />
          <Categories />
          <Statuses />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  var categories = state.categories.items;
  var salesmen = state.salesmen.items;
  var statuses = state.statuses.items;
  //var users = state.users.items;

  let loaded = false;

  if(state.categories.loaded &&
     state.salesmen.loaded &&
     state.statuses.loaded
     //state.users.loaded
   ) {
    loaded = true;
  }

  return { loaded, categories, salesmen, statuses }
}

export default connect(mapStateToProps)(Admin);
