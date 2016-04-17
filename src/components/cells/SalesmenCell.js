import React, { Component, PropTypes } from 'react';
import { Input } from 'react-bootstrap';
import {Table, Column, Cell} from 'fixed-data-table';
import { connect } from 'react-redux';

class SalesmenCell extends Component {

  render() {

    const { loaded, companies, rowIndex } = this.props;

    if(!loaded) {return(<Cell></Cell>);}

    let salesmen = companies[rowIndex]['sales'].map(sale => {
      return _.find(this.props.salesmen, ['_id', sale.salesmanId]).name;
    });

    salesmen = _.uniq(salesmen);

    if(salesmen.length > 1){


      let tooltip = salesmen.map(salesman => {
          return(
            <span>{salesman}</span>
          );
      });

      return(
        <Cell>
          <div>* {salesmen.length} Sölumenn</div>
        </Cell>
      );
    }

    return(
      <Cell>
        <div>{salesmen[0]}</div>
      </Cell>
    );
  }

}

SalesmenCell.propTypes = {
  companies: PropTypes.array.isRequired,
  salesmen: PropTypes.array.isRequired,
  loaded: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  var companies = state.companies.items;
  var salesmen = state.salesmen.items;

  let loaded = false;

  if(state.companies.loaded) {
    loaded = true;
  }

  return { loaded, companies, salesmen }
}

export default connect(mapStateToProps)(SalesmenCell);
