import React, { Component, PropTypes } from 'react';
import { Input, Button, Glyphicon } from 'react-bootstrap';
import {Table, Column, Cell } from 'fixed-data-table';
import { connect } from 'react-redux';
import _ from 'lodash';
import jwtDecode from 'jwt-decode';

class FocusGroupsCell extends Component {

  onClick = () => {
    const { companies, rowIndex} = this.props;
    this.props.onClick(companies[rowIndex], 2);
  };

  render() {

    const { loaded, focusGroups, width } = this.props;

    if(!loaded) {
      return(<Cell />);
    }

    const icons = focusGroups.map(group => {
        x = x + 15;
        return (
          <rect width="12" height="12" x={x} y="3" rx={8} ry={8} stroke="black" strokeWidth="1" fill={group.color}>
            <title>{group.name}</title>
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
          <div>
            <Button bsSize="small" onClick={this.onClick} style={{border: '0'}}><Glyphicon style={{height: '5px'}} glyph="chevron-up" /></Button>
          </div>
        </div>
      </Cell>
    );
  }

}

StatusCell.propTypes = {
  focusGroups: PropTypes.array.isRequired,
  loaded: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
}

function mapStateToProps(state) {
  const focusGroups = state.focusGroups.items;
  let loaded = false;
  if(state.companies.loaded) {
    loaded = true;
  }

  const width = (state.common.width / 11)

  return { loaded, focusGroup, width }
}

export default connect(mapStateToProps)(FocusGroupCell);
