import React, { Component, PropTypes } from 'react';
import { Input } from 'react-bootstrap';
import {Table, Column, Cell} from 'fixed-data-table';
import { connect } from 'react-redux';
import TextCell from './cells/TextCell';
import TextTooltipCell from './cells/TextTooltipCell';
import EditCell from './cells/EditCell';
import PhoneCell from './cells/PhoneCell';
import SsnCell from './cells/SsnCell';
import SignCell from './cells/SignCell';
import TextFilter from './cells/TextFilter';
import SalesmanFilter from './cells/SalesmanFilter';
import StatusFilter from './cells/StatusFilter';
import SalesmenCell from './cells/SalesmenCell';
import GroupFilter from './cells/GroupFilter';
import StatusCell from './cells/StatusCell';
import CommentCell from './cells/CommentCell';
import { fetchCompanies } from '../actions/companies';
import jwtDecode from 'jwt-decode';
import MultipleSelectFilter from './cells/MultipleSelectFilter';
import FocusGroupCell from './cells/FocusGroupCell';

import 'fixed-data-table/dist/fixed-data-table.min.css';
import {fetchGroups} from '../actions/groups';

import postalCodes from 'json!../../data/postalCodes.json';
import focusGroups from '../reducers/focusGroups';

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

  componentDidMount = () => {
    //this.refs.dataTable.scrollToRow(200);
  }

  filterSsnRow = (e) => {
    this.props.filter(e.target.name, e.target.value.replace('-',''));
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
    const { salesmen } = this.props;
    let token = jwtDecode(sessionStorage.token);
    let assigned = (token.type !== "salesman" || company.sales.length === 0) ? true : false;

    company.sales.map(sale => {
      if(sale.salesmanId === token.salesman) {
        assigned = true;
      }
    });

    if(assigned) {
      this.props.onClick(company, tab);
    }
  };

  sortIcon = (column) => {
    const { sorting } = this.props;
    return sorting.column === column ? (sorting.order === 'desc' ? '↓' : '↑') : '';
  };

  render() {
    const { rowCount, sorting, width, height, focusGroups } = this.props;

    const postalCodeItems = postalCodes.map(code => ({
      _id: code.code,
      name: `${code.code}${' '}${code.place}`
    }));

    const nrColumns = 15;
    const md = (width/13) // 7
    const lg = (width/12);
    const sm = (width/16);

    return(
        <Table
          rowHeight={30}
          headerHeight={80}
          rowsCount={rowCount}
          width={width}
          height={height}
          ref="dataTable"
          {...this.props}>
          <Column
            header={<Cell></Cell>}
            cell={props => (<SignCell {...props} />)}
            fixed={true}
            width={sm - 40}
          />
          <Column
            header={<SalesmanFilter label="SM" column="salesman" filter={this.filter} />}
            cell={props => (<SalesmenCell {...props} />)}
            fixed={true}
            width={sm - 35}
          />
          <Column
            header={<StatusFilter label="Staða" column="status" filter={this.filter} />}
            cell={props => (<StatusCell {...props} onClick={this.onClick} />)}
            fixed={true}
            width={lg + 40}
          />
          <Column
            header={<TextFilter label="Nafn" column="name" filter={this.filterRow} sorting={this.sortIcon('name')} onSort={this.onSort} />}
            cell={props => (<TextCell {...props} column="name" onClick={this.onClick} />)}
            fixed={true}
            width={lg}
          />
          <Column
            header={<TextFilter label="Kennitala" column="ssn" filter={this.filterSsnRow} sorting={this.sortIcon('ssn')} onSort={this.onSort} /> }
            cell={props => (<SsnCell {...props} column="ssn" />)}
            fixed={true}
            width={md}
          />
          <Column
            header={<TextFilter label="Heimilisfang" column="address" filter={this.filterRow} sorting={this.sortIcon('address')} onSort={this.onSort} /> }
            cell={props => (<TextCell {...props} column="address" />)}
            fixed={true}
            width={md}
          />
          <Column
            //header={<TextFilter label="Pnr" column="postalCode" filter={this.filterRow} sorting={this.sortIcon('postalCode')} onSort={this.onSort} /> }
            header={<MultipleSelectFilter items={postalCodeItems} label="Pnr" column="postalCode" filter={this.filter} field="postalCode" />}
            cell={props => (<TextCell {...props} column="postalCode" />)}
            fixed={true}
            width={sm - 30}
          />
          <Column
            header={<TextFilter label="Sími" column="phone" filter={this.filterRow} sorting={this.sortIcon('phone')} onSort={this.onSort} />}
            cell={props => (<PhoneCell {...props} column="phone" />)}
            fixed={true}
            width={md - 10}
          />
          <Column
            header={<TextFilter label="Netfang" column="email" filter={this.filterRow} sorting={this.sortIcon('email')} onSort={this.onSort} />}
            cell={props => (<TextCell {...props} column="email" />)}
            fixed={true}
            width={md}
          />
          <Column
            header={<TextFilter label="Tengill" column="contact" filter={this.filterRow} sorting={this.sortIcon('contact')} onSort={this.onSort} />}
            cell={props => (<TextCell {...props} column="contact" />)}
            fixed={true}
            width={md}
          />
          <Column
            header={
              <Cell>
                <div>
                 Ath
                </div>
                <div style={{ height: 42 }} />
              </Cell>
            }
            cell={props => (<CommentCell style={{padding: '0'}} {...props} column="comment" onClick={this.onClick} />)}
            fixed={true}
            width={sm - 45}
          />
          <Column
            header={
              <TextFilter label="Yfirflokkur" column="maingroup" filter={this.filterRow} sorting={this.sortIcon('contact')} onSort={this.onSort} />
            }
            cell={props => (<TextTooltipCell {...props} column="maingroup" />)}
            fixed={true}
            width={md -3}
          />
          <Column
            header={<TextFilter label="Undirflokkur" column="subgroup" filter={this.filterRow} sorting={this.sortIcon('contact')} onSort={this.onSort} />}
            cell={props => (<TextTooltipCell {...props} column="subgroup" />)}
            fixed={true}
            width={md - 3}
          />
          <Column
            header={<TextFilter label="Undirflokkur" column="subsubgroup" filter={this.filterRow} sorting={this.sortIcon('contact')} onSort={this.onSort} />}
            cell={props => (<TextTooltipCell {...props} column="subsubgroup" />)}
            fixed={true}
            width={md - 3}
          />
          <Column
            header={<MultipleSelectFilter items={focusGroups} label="MH" column="focusGroup" filter={this.filter} field="focusGroups" />}
            cell={props => (<FocusGroupCell {...props} column="focusgroup"/>)}
            fixed={true}
            width={sm}
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
  dispatch: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  focusGroups: PropTypes.array.isRequired,
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

  const focusGroups = state.focusGroups.items;

  const width = (state.common.width - 40);
  const height = (state.common.height - 100);

  return { statuses, salesmen, categories, sorting, width, height, focusGroups  }
}

export default connect(mapStateToProps)(Companies);
