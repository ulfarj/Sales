import React, { Component, PropTypes } from 'react';
import { Input } from 'react-bootstrap';
import {Table, Column, Cell} from 'fixed-data-table';
import { connect } from 'react-redux';
import TextCell from './cells/TextCell';
import EditCell from './cells/EditCell';
import PhoneCell from './cells/PhoneCell';
import SsnCell from './cells/SsnCell';
import SignCell from './cells/SignCell';
import TextFilter from './cells/TextFilter';
import SalesmanFilter from './cells/SalesmanFilter';
import StatusFilter from './cells/StatusFilter';
import SalesmenCell from './cells/SalesmenCell';
import StatusCell from './cells/StatusCell';
import { fetchCompanies } from '../actions/companies';

import 'fixed-data-table/dist/fixed-data-table.min.css';

const styles = {
  input: {
    border: 0
  },
  tbody: {
    border: 0
  },
};

class Companies extends Component {

  constructor(props) {
     super(props);
     this.state = {
       filter: {},
     }
  }

  componentWillMount = () => {
    const { dispatch, statuses, salesmen, categories } = this.props;

    let filter = {};
    filter['statuses'] = statuses;
    filter['salesmen'] = salesmen;
    filter['categories'] = categories;

    let sorting = {
      'column': 'name',
      'order': 'asc'
    };

    filter['sorting'] = sorting;

    filter['nosale'] = true;

    dispatch(fetchCompanies(filter));
  };

  filterRow = (e) => {
    this.props.filter(e.target.name, e.target.value);
  };

  filter = (name, value) => {
    this.props.filter(name, value);
  };

  onSort = (column) => {

    let order = 'asc';
    if(this.props.sorting.column === column && this.props.sorting.order === 'asc'){
      order = 'desc';
    }

    let sorting = {
      'column': column,
      'order': order
    };

    this.props.filter('sorting', sorting);
  };

  onClick = (company, tab) => {
    this.props.onClick(company, tab);
  };

  sortIcon = (column) => {
    const { sorting } = this.props;
    return sorting.column === column ? (sorting.order === 'desc' ? '↓' : '↑') : '';
  };


  render() {
    const { rowCount, sorting } = this.props;

    return(
        <Table
           rowHeight={30}
           headerHeight={80}
           rowsCount={rowCount}
           width={1145}
           height={600}
           {...this.props}>
           <Column
             header={<Cell></Cell>}
             cell={props => (<SignCell {...props} />)}
             fixed={true}
             width={60}
            />
           <Column
             header={<SalesmanFilter label="SM" column="salesman" filter={this.filter} />}
             cell={props => (<SalesmenCell {...props} />)}
             fixed={true}
             width={60}
            />
            <Column
              header={<StatusFilter label="Staða" column="status" filter={this.filter} />}
              cell={props => (<StatusCell {...props} onClick={this.onClick} />)}
              fixed={true}
              width={140}
             />
           <Column
             header={<TextFilter label="Nafn" column="name" filter={this.filterRow} sorting={this.sortIcon('name')} onSort={this.onSort} />}
             cell={props => (<TextCell {...props} column="name" onClick={this.onClick} />)}
             fixed={true}
             width={160}
            />
            <Column
              header={<TextFilter label="Kennitala" column="ssn" filter={this.filterRow} sorting={this.sortIcon('ssn')} onSort={this.onSort} /> }
              cell={props => (<SsnCell {...props} column="ssn" />)}
              fixed={true}
              width={120}
             />
             <Column
               header={<TextFilter label="Heimilisfang" column="address" filter={this.filterRow} sorting={this.sortIcon('address')} onSort={this.onSort} /> }
               cell={props => (<TextCell {...props} column="address" />)}
               fixed={true}
               width={160}
              />
            <Column
              header={<TextFilter label="Pnr" column="postalCode" filter={this.filterRow} sorting={this.sortIcon('postalCode')} onSort={this.onSort} /> }
              cell={props => (<TextCell {...props} column="postalCode" />)}
              fixed={true}
              width={65}
              />
            <Column
              header={<TextFilter label="Sími" column="phone" filter={this.filterRow} sorting={this.sortIcon('phone')} onSort={this.onSort} />}
              cell={props => (<PhoneCell {...props} column="phone" />)}
              fixed={true}
              width={100}
              />
            <Column
              header={<TextFilter label="Netfang" column="email" filter={this.filterRow} sorting={this.sortIcon('email')} onSort={this.onSort} />}
              cell={props => (<TextCell {...props} column="email" />)}
              fixed={true}
              width={120}
              />
            <Column
              header={<TextFilter label="Athugasemd" column="comment" filter={this.filterRow} sorting={this.sortIcon('comment')} onSort={this.onSort} />}
              cell={props => (<EditCell style={{padding: '0'}} {...props} column="comment" onClick={this.onClick} />)}
              fixed={true}
              width={160}
              />
        </Table>
    )
  }

}

Companies.propTypes = {
  statuses: PropTypes.array.isRequired,
  salesmen: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  sorting: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {

  let statuses = state.statuses.items.map(status => {
      return status._id;
  });

  let salesmen = state.salesmen.items.map(salesman => {
      return salesman._id;
  });

  let categories = state.categories.items.map(category => {
      return category._id;
  });

  let sorting = {};

  if(state.companies.filter) {
    sorting = state.companies.filter.sorting;
  }

  return { statuses, salesmen, categories, sorting  }
}

export default connect(mapStateToProps)(Companies);
