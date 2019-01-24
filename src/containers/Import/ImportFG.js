import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentFocusGroups } from '../../actions/focusGroups';

import _ from 'lodash';
import importFgFile from 'json!../../../server/import/fg.json';
import companies from '../../reducers/companies';
import focusGroups from '../../reducers/focusGroups';


class ImportFG extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrentFocusGroups());
  }

  render() {
    const { loaded, focusGroups, dispatch } = this.props;
    if(!loaded) {
        return(<div>Loading</div>);
    }

    // const first = "500/2015";
    // const second = "500/2016";
    // const third = "Framúrskarandi 2016";
    // const fourt = "Framúrskarandi 2018";
    // const firstId = _.find(focusGroups, { 'name': first })._id

    const companies = importFgFile.map(company => {

        const arr = [];
        focusGroups.map(group => {
           if(company[group.name] === "X") {
             arr.push(_.find(focusGroups, { 'name': group.name })._id);
           }
        });

        console.log(company.ssn, arr);

        // if(company[first] === "X") {
        //   arr.push(firstId);
        // }

        // "500/2016"
        // "Framúrskarandi 2016"
        // "Framúrskarandi 2018"
    });



    return (
      <div>
        Focus groups
      </div>
    );
  }
}

function mapStateToProps(state) {
  const focusGroups = state.focusGroups.items;
  const loaded = state.focusGroups.loaded;

  return { loaded, focusGroups };
}

export default connect(mapStateToProps)(ImportFG);

