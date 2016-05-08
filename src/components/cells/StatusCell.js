import React, { Component, PropTypes } from 'react';
import { Input } from 'react-bootstrap';
import {Table, Column, Cell} from 'fixed-data-table';
import { connect } from 'react-redux';
import _ from 'lodash';

class StatusCell extends Component {

  render() {

    const { loaded, companies, categories, statuses, rowIndex, filter } = this.props;

    if(!loaded) {return(<Cell></Cell>);}

    let sales = companies[rowIndex].sales.map(sale => {
      let selected = _.indexOf(filter.categories, sale.categoryId) > -1;
      let category = _.find(this.props.categories, ['_id', sale.categoryId]);
      let status = _.find(this.props.statuses, ['_id', sale.statusId]);
      let salesman = _.find(this.props.salesmen, ['_id', sale.salesmanId]);

      return {
        'selected': selected,
        'category': category.name,
        'status': status.name,
        'salesman': salesman.name,
        'color': status.color
      }
    });

    sales = _.sortBy(sales, function(o) { return o.category; });

    let x = 0;
    let cx = 0;
    let statusIcons = sales.map(sale => {

      x = x + 15;
      if(sale.selected)
      {
        return (
          <rect width="12" height="12" x={x} y="3" stroke="black" strokeWidth="1" fill={sale.color}>
            <title>{sale.category} - {sale.salesman} - {sale.status}</title>
          </rect>
          );
      }

      return (
        <rect width="12" height="12" x={x} y="3" rx={8} ry={8} stroke="black" strokeWidth="1" fill={sale.color}>
          <title>{sale.category} - {sale.salesman} - {sale.status}</title>
        </rect>
        );
    });

    return(
      <Cell>
        <svg width="100" height="16">
          {statusIcons}
        </svg>
      </Cell>
    );
  }

}

StatusCell.propTypes = {
  companies: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  statuses: PropTypes.array.isRequired,
  salesmen: PropTypes.array.isRequired,
  loaded: PropTypes.bool.isRequired,
  filter: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  let companies = state.companies.items;
  let categories = state.categories.items;
  let statuses = state.statuses.items;
  let salesmen = state.salesmen.items;
  let filter = state.companies.filter;

  let loaded = false;

  if(state.companies.loaded) {
    loaded = true;
  }

  return { loaded, companies, categories, statuses, salesmen, filter }
}

export default connect(mapStateToProps)(StatusCell);
