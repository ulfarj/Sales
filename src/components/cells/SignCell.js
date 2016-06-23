import React, { Component, PropTypes } from 'react';
import { Input, Button, Glyphicon } from 'react-bootstrap';
import {Table, Column, Cell } from 'fixed-data-table';
import { connect } from 'react-redux';
import _ from 'lodash';
import ToggleDisplay from 'react-toggle-display';

const styles = {
  noDisplay: {
    display: 'none'
  }
};


class SignCell extends Component {

  render() {

    const { loaded, companies, rowIndex } = this.props;

    if(!loaded) {return(<Cell></Cell>);}

    let company = companies[rowIndex];

    let signs = '';

    if(company.legal && company.dontcontact) {
      signs = (
        <svg width="33" height="16">
          <rect width="12" height="12" x="1" y="3" rx={8} ry={8} stroke="black" strokeWidth="1" fill="red">
              <title>Lögfræðimerkt</title>
          </rect>
          <rect width="12" height="12" x="20" y="3" rx={8} ry={8} stroke="black" strokeWidth="1" fill="yellow">
            <title>Ekki hafa samband</title>
          </rect>
        </svg>
      );
    }else {

      if(company.legal){
        signs = (
          <svg width="33" height="16">
            <rect width="12" height="12" x="1" y="3" rx={8} ry={8} stroke="black" strokeWidth="1" fill="red">
                <title>Lögfræðimerkt</title>
            </rect>
          </svg>
        );
      }
      if(company.dontcontact) {
        signs = (
          <svg width="33" height="16">
            <rect width="12" height="12" x="20" y="3" rx={8} ry={8} stroke="black" strokeWidth="1" fill="yellow">
              <title>Ekki hafa samband</title>
            </rect>
          </svg>
        );
      }
    }

    return(
      <Cell>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <div>
            {signs}
          </div>
        </div>
      </Cell>
    );
  }

}

SignCell.propTypes = {
  companies: PropTypes.array.isRequired,
  loaded: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  let companies = state.companies.items;
  let loaded = (state.companies.loaded) ? true : false;

  return { loaded, companies }
}

export default connect(mapStateToProps)(SignCell);
