import React, { Component, PropTypes } from 'react';
import { Input } from 'react-bootstrap';
import {Table, Column, Cell} from 'fixed-data-table';

import 'fixed-data-table/dist/fixed-data-table.min.css';

const styles = {
  input: {
    border: 0
  },
};

class Filter extends Component {

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

   const TextCellFilter = ({label, column}) => (
      <Cell>
          <div>{label}</div>
          <div style={{paddingTop: '4px'}}>
            <Input type="text" style={styles.input} onChange={this.filterRow} name={column} />
          </div>
      </Cell>
    );

    return(
      <Table
        headerHeight={80}
        rowsCount={0}
        rowHeight={50}
        width={1000}
        height={80}>
        <Column
          header={<TextCellFilter label="Nafn" column="name" />}
          width={150}
        />
      </Table>


    )

  }
}

export default Filter;
