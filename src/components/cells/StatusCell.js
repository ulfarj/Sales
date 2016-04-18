import React, { Component, PropTypes } from 'react';
import { Input } from 'react-bootstrap';
import {Table, Column, Cell} from 'fixed-data-table';
import { connect } from 'react-redux';

class StatusCell extends Component {

  render() {

    const { loaded, companies, categories, statuses, rowIndex, filter } = this.props;

    if(!loaded) {return(<Cell></Cell>);}

    let x = 0;
    let cx = 0;
    let statusIcons = companies[rowIndex].sales.map(sale => {

      let selected = _.indexOf(filter.categories, sale.categoryId) > -1;
      let category = _.find(this.props.categories, ['_id', sale.categoryId]);
      let status = _.find(this.props.statuses, ['_id', sale.statusId]);
      let salesman = _.find(this.props.salesmen, ['_id', sale.salesmanId]);

      x = x + 15;
      if(selected)
      {
        return (
          <rect width="12" height="12" x={x} y="3" stroke="black" strokeWidth="1" fill={sale.color}>
            <title>{category.name} - {salesman.name} - {status.name}</title>
          </rect>
          );
      }

      return (
        <rect width="12" height="12" x={x} y="3" rx={8} ry={8} stroke="black" strokeWidth="1" fill={sale.color}>
          <title>{category.name} - {salesman.name} - {status.name}</title>
        </rect>
        );

      /*cx = cx + 15;
      return (
        <circle cx={cx} cy="8" r="6" stroke="black" strokeWidth="1" fill={status.color}>
          <title>{category.name} - {salesman.name} - {status.name}</title>
        </circle>
      );*/
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