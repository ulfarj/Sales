import React, { Component, PropTypes } from 'react';
import { Input, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Table, Column, Cell } from 'fixed-data-table';
import { connect } from 'react-redux';

class TextCell extends Component {

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

    const text = companies[rowIndex][column];

    return(
      <Cell onClick={this.onClick}>
        {text}
      </Cell>
    );
  }

}

TextCell.propTypes = {
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

export default connect(mapStateToProps)(TextCell);
