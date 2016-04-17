import React, { Component, PropTypes } from 'react';
import { Input } from 'react-bootstrap';
import {Table, Column, Cell} from 'fixed-data-table';
import { connect } from 'react-redux';
import TextCell from './cells/TextCell';
import TextFilter from './cells/TextFilter';
import SalesmenCell from './cells/SalesmenCell';

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

  filterRow = (e) => {
    this.props.filter(e.target.name, e.target.value);
  };

  onClick = (company) => {
    this.props.onClick(company);
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
             header="Sölumenn"
             cell={props => (<SalesmenCell {...props} />)}
             fixed={true}
             width={160}
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
              cell={props => (<TextCell {...props} column="comment" />)}
              fixed={true}
              width={160}
              />
        </Table>
    )
  }

}

Companies.propTypes = {
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {  }
}

export default connect(mapStateToProps)(Companies);
