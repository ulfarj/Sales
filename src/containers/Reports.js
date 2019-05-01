import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchCurrentCategories } from '../actions/categories';


class Reports extends Component {

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrentCategories());
  }

   render() {
    return (
      <div>Reports</div>
    );
   }
}

Reports.propTypes = {
  categories: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
  return {
    categories: state.categories.items,
    loaded: state.categories.loaded,
  }
}

export default connect(mapStateToProps)(Reports);