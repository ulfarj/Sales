import React, { Component, PropTypes } from 'react';
import { Input, Button, Glyphicon } from 'react-bootstrap';
import {Table, Column, Cell } from 'fixed-data-table';
import { connect } from 'react-redux';
import _ from 'lodash';
import jwtDecode from 'jwt-decode';
import {fetchGroups} from '../../actions/groups';

class FocusGroupCell extends Component {

  render() {

    const { companies, loaded, width, rowIndex, focusGroups } = this.props;

    if(!loaded) {
      return(<Cell />);
    }


    if(!companies[rowIndex].focusGroups || companies[rowIndex].focusGroups.length < 1){
        return(<Cell></Cell>);
    }

    let x = 0;
    let cx = 0;
    const icons = companies[rowIndex].focusGroups.map(group => {
        x = x + 15;
        const focus = _.find(focusGroups, ['_id', group])
        return (
          <rect width="12" height="12" x={x} y="3" rx={8} ry={8} stroke="black" strokeWidth="1" fill={focus.color}>
            <title>{focus.name}</title>
          </rect>
        );
    });

    return(
      <Cell>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <div>
            <svg width={width - 10} height="16">
              {icons}
            </svg>
          </div>
        </div>
      </Cell>
    );
  }

}

FocusGroupCell.propTypes = {
  companies: PropTypes.array.isRequired,
  loaded: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  focusGroups: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  const companies = state.companies.items;
  let loaded = false;
  if(state.companies.loaded) {
    loaded = true;
  }

  const width = (state.common.width / 11)

  return { companies, loaded, width, focusGroups: state.focusGroups.items }
}

export default connect(mapStateToProps)(FocusGroupCell);
