import React, { Component, PropTypes } from 'react';
import { Input } from 'react-bootstrap';
import {Table, Column, Cell} from 'fixed-data-table';
import { connect } from 'react-redux';
import TextCell from './cells/TextCell';
import EditCell from './cells/EditCell';
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

    var filter = {};
    filter['statuses'] = statuses;
    filter['salesmen'] = salesmen;
    filter['categories'] = categories;

    dispatch(fetchCompanies(filter));
  };

  filterRow = (e) => {
    this.props.filter(e.target.name, e.target.value);
  };

  filter = (name, value) => {
    this.props.filter(name, value);
  };

  onClick = (company, tab) => {
    this.props.onClick(company, tab);
  };

  render() {

    const { rowCount } = this.props;

    return(
        <Table
           rowHeight={30}
           headerHeight={80}
           rowsCount={rowCount}
           width={1200}
           height={600}
           {...this.props}>
           <Column
             header={<SalesmanFilter label="Sölumaður" column="salesman" filter={this.filter} />}
             cell={props => (<SalesmenCell {...props} />)}
             fixed={true}
             width={160}
            />
            <Column
              header={<StatusFilter label="Staða" column="status" filter={this.filter} />}
              cell={props => (<StatusCell {...props} onClick={this.onClick} />)}
              fixed={true}
              width={140}
             />
           <Column
             header={<TextFilter label="Nafn" column="name" filter={this.filterRow} />}
             cell={props => (<TextCell {...props} column="name" onClick={this.onClick} />)}
             fixed={true}
             width={160}
            />
            <Column
              header={<TextFilter label="Kennitala" column="ssn" filter={this.filterRow} />}
              cell={props => (<TextCell {...props} column="ssn" />)}
              fixed={true}
              width={120}
             />
             <Column
               header={<TextFilter label="Heimilisfang" column="address" filter={this.filterRow} />}
               cell={props => (<TextCell {...props} column="address" />)}
               fixed={true}
               width={160}
              />
            <Column
              header={<TextFilter label="Póst nr" column="postalCode" filter={this.filterRow} />}
              cell={props => (<TextCell {...props} column="postalCode" />)}
              fixed={true}
              width={80}
              />
            <Column
              header={<TextFilter label="Sími" column="phone" filter={this.filterRow} />}
              cell={props => (<TextCell {...props} column="phone" />)}
              fixed={true}
              width={100}
              />
            <Column
              header={<TextFilter label="Netfang" column="email" filter={this.filterRow} />}
              cell={props => (<TextCell {...props} column="email" />)}
              fixed={true}
              width={120}
              />
            <Column
              header={<TextFilter label="Athugasemd" column="comment" filter={this.filterRow} />}
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

  return { statuses, salesmen, categories  }
}

export default connect(mapStateToProps)(Companies);
