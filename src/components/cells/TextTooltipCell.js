import React, { Component, PropTypes } from 'react';
import { Input, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Table, Column, Cell } from 'fixed-data-table';
import { connect } from 'react-redux';

class TextTooltipCell extends Component {

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

    const tooltip = (
      <Tooltip id="tooltip">{text}</Tooltip>
    );

    return(
      <Cell onClick={this.onClick}>
        <OverlayTrigger placement="bottom" overlay={tooltip}>
          <Button
            bsStyle="default"
            style={{ border: 0, padding: 0, margin: 0, cursor: 'auto' }}>
            {text}
          </Button>
        </OverlayTrigger>
      </Cell>
    );
  }

}

TextTooltipCell.propTypes = {
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

export default connect(mapStateToProps)(TextTooltipCell);
