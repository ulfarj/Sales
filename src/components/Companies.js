import React, { Component, PropTypes } from 'react';
import { Input } from 'react-bootstrap';
import {Table, Column, Cell} from 'fixed-data-table';
import { connect } from 'react-redux';
import TextCell from './cells/TextCell';

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

  render() {

    const { rowCount } = this.props;

    return(
        <Table
           rowHeight={30}
           headerHeight={30}
           rowsCount={rowCount}
           width={1000}
           height={500}
           {...this.props}>
           <Column
             header="Name"
             cell={props => (<TextCell {...props} column="name" />)}
             fixed={true}
             width={150}
            />
        </Table>
    )
  }

}

Companies.propTypes = {
  rowCount: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  var companies = state.companies.items;

  let rowCount = 0;

  if(state.companies.loaded) {
    rowCount = state.companies.items.length;
  }

  return { rowCount }
}

export default connect(mapStateToProps)(Companies);
