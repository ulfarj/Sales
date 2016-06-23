import React, { Component, PropTypes } from 'react';
import { Input } from 'react-bootstrap';
import {Table, Column, Cell} from 'fixed-data-table';
import { connect } from 'react-redux';

class PhoneCell extends Component {

  onClick = () => {

    if(this.props.onClick) {
      const { companies, rowIndex} = this.props;
      this.props.onClick(companies[rowIndex], 1);
    }

  };

  render() {

    const { loaded, companies, rowIndex, column } = this.props;

    if(!loaded) {
        return(<Cell></Cell>);
    }

    let phone = companies[rowIndex][column];

    if(phone.length > 0) {
      phone = phone.slice(0,3) + '-' + phone.slice(3, (phone.length));
    }

    return(
      <Cell onClick={this.onClick}>
        <div>{phone}</div>
      </Cell>
    );
  }

}

PhoneCell.propTypes = {
  companies: PropTypes.array.isRequired,
  loaded: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  var companies = state.companies.items;

  let loaded = false;

  if(state.companies.loaded) {
    loaded = true;
  }

  return { loaded, companies }
}

export default connect(mapStateToProps)(PhoneCell);
