import React, { Component, PropTypes } from 'react';
import { Input } from 'react-bootstrap';
import {Table, Column, Cell} from 'fixed-data-table';
import { connect } from 'react-redux';
import TextCell from './cells/TextCell';
import TextFilter from './cells/TextFilter';

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
    var filter = this.state.filter;
    filter[e.target.name] = e.target.value;
    this.props.filter(filter);
  };

  render() {

    const { rowCount } = this.props;

    return(
        <Table
           rowHeight={30}
           headerHeight={80}
           rowsCount={rowCount}
           width={1000}
           height={500}
           {...this.props}>
           <Column
             header={<TextFilter label="Nafn" column="name" filter={this.filterRow} />}
             cell={props => (<TextCell {...props} column="name" filter={this.filterRow} />)}
             fixed={true}
             width={150}
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
