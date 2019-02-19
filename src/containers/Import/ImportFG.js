import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentFocusGroups, setFocusGroupsBulk } from '../../actions/focusGroups';

import _ from 'lodash';
import importFgFile from 'json!../../../server/import/fg.json';
import companies from '../../reducers/companies';
import focusGroups from '../../reducers/focusGroups';
import FocusGroups from '../../components/Admin/FocusGroups';


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

    const fg = [];

    const companies = importFgFile.map(company => {
        const ssn = String(company.ssn);
        const arr = [];
        focusGroups.map(group => {
           if(company[group.name] === "X") {
             arr.push(_.find(focusGroups, { 'name': group.name })._id);
           }
        });

        // const update = {
        //   updateOne :
        //   {
        //        "filter" : { ssn },
        //        "update" : { $set : { "focusGroups": arr } }
        //    }
        // };

        const update = { ssn, focusGroups: arr };

        fg.push(update);

    });

    console.log(fg);
    dispatch(setFocusGroupsBulk(fg));

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

