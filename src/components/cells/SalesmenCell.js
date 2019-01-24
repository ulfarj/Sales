import React, { Component, PropTypes } from 'react';
import { Input } from 'react-bootstrap';
import {Table, Column, Cell} from 'fixed-data-table';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';

class SalesmenCell extends Component {

  render() {

    const { loaded, companies, rowIndex } = this.props;

    if(!loaded) {return(<Cell></Cell>);}

    let salesmen = companies[rowIndex]['sales'].map(sale => {
      let salesman = _.find(this.props.salesmen, ['_id', sale.salesmanId]);
      return salesman ? salesman.name : '';
    });

    salesmen = _.uniq(salesmen);

    if(salesmen.length > 1){

      let tooltip = salesmen.map(salesman => {
          return ' '+salesman;
          return(
            <span>{salesman}</span>
          );
      });


      return(
        <Cell title={tooltip}>* {salesmen.length} Sölumenn</Cell>
      );
    }

    let salesman = salesmen[0];
    if(salesman && salesman.length > 0) {

      return (
        <div>
          <Cell title={salesman}>
            {salesman.replace(/[^A-ZÀ-ÖØ-Þ]/g, '')}
          </Cell>
        </div>
      );
    }

    return(
      <div>
        <Cell></Cell>
      </div>
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
