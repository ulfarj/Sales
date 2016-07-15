import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentCategories } from '../actions/categories';
import { fetchCurrentSalesmen } from '../actions/salesmen';
import { fetchCurrentStatuses } from '../actions/statuses';
import _ from 'lodash';
import { Table, Button, Input } from 'react-bootstrap';
import Salesmen from '../components/Admin/Salesmen';
import Statuses from '../components/Admin/Statuses';
import Categories from '../components/Admin/Categories';


class Admin extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrentCategories());
    dispatch(fetchCurrentSalesmen());
    dispatch(fetchCurrentStatuses());
  }

  render() {
    const { dispatch, loaded } = this.props;

    if(!loaded) {
      return(<div>Loading</div>);
    }

    return (
      <div>
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

  let loaded = false;

  if(state.categories.loaded && state.salesmen.loaded && state.statuses.loaded) {
    loaded = true;
  }

  return { loaded, categories, salesmen, statuses}
}

export default connect(mapStateToProps)(Admin);
