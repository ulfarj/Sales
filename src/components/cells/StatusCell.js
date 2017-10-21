import React, { Component, PropTypes } from 'react';
import { Input, Button, Glyphicon } from 'react-bootstrap';
import {Table, Column, Cell } from 'fixed-data-table';
import { connect } from 'react-redux';
import _ from 'lodash';
import jwtDecode from 'jwt-decode';

class StatusCell extends Component {

  onClick = () => {
    const { companies, rowIndex} = this.props;
    this.props.onClick(companies[rowIndex], 2);
  };

  render() {

    const { loaded, companies, categories, statuses, rowIndex, filter, width } = this.props;

    if(!loaded) {return(<Cell></Cell>);}

    if(companies[rowIndex].sales.length < 1){
        return(<Cell></Cell>);
    }

    let token = jwtDecode(sessionStorage.token);
    let assigned = (token.type !== "salesman") ? true : false;

    let sales = [];

    companies[rowIndex].sales.map(sale => {

      let selected = _.indexOf(filter.categories, sale.categoryId) > -1;
      let category = _.find(this.props.categories, ['_id', sale.categoryId]);
      let status = _.find(this.props.statuses, ['_id', sale.statusId]);
      let salesman = _.find(this.props.salesmen, ['_id', sale.salesmanId]);

      if(salesman && (salesman._id === token.salesman)) {
        assigned = true;
      }

      
      if(token.type === 'supervisorlimited') {
        if(category && category.name && category.name === 'Ísland atvinnuhættir og menning') {
          return;
        }        
      }

      sales.push({
        'selected': selected,
        'category': category ? category.name : '',
        'status': status ? status.name : '',
        'salesman': salesman ? salesman.name : '',
        'color': status ? status.color : '',
      });
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
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <div>
            <svg width={width - 10} height="16">
              {statusIcons}
            </svg>
          </div>
          <div>
            {assigned &&
              <Button bsSize="small" onClick={this.onClick} style={{border: '0'}}><Glyphicon style={{height: '5px'}} glyph="chevron-up" /></Button>
            }
          </div>
        </div>
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
  filter: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
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

  const width = (state.common.width / 11)

  return { loaded, companies, categories, statuses, salesmen, filter, width }
}

export default connect(mapStateToProps)(StatusCell);
