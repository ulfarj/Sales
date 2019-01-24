import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchCompanies } from '../../actions/companies';

import { importCompanies } from '../../actions/company';
import _ from 'lodash';
import importCompaniesFile from 'json!../../../server/import/sagazCompanies.json';
import companies from '../../reducers/companies';


class ImportCompanies extends Component {
  // componentWillMount() {
  //   const { dispatch } = this.props;
  //   const filter = {};
  //   let sorting = {
  //     'column': 'name',
  //     'order': 'asc'
  //   };
  //   filter['sorting'] = sorting;
  //   filter['nosale'] = true;

  //   dispatch(fetchCompanies(filter));
  // }

  render() {
    const { dispatch } = this.props;

    // if(!loaded) {
    //     return(<div>Loading</div>);
    // }

    const companies = importCompaniesFile.map(company => ({
      ...company,
      sales: [],
      phone: "",
      email: "",
      comment: "",
      namersk: "",
    }));

    console.log(companies);
    // dispatch(importCompanies(companies));

    return (
      <div>
        Import Done

      </div>
    );
  }
}

function mapStateToProps(state) {
  const companies = state.companies.items;
  const loaded = state.companies.loaded;

  return { loaded, companies}
}

export default connect(mapStateToProps)(ImportCompanies);
