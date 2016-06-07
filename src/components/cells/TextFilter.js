import React, { Component, PropTypes } from 'react';
import { Input } from 'react-bootstrap';
import {Table, Column, Cell} from 'fixed-data-table';
import { connect } from 'react-redux';

const styles = {
  input: {
    border: 0
  }
};

class TextFilter extends Component {

  onSort = () => {
    const { column } = this.props;
    this.props.onSort(column);
  };

  render() {

    const { label, column, sorting } = this.props;

    return(
      <Cell>
          <div onClick={this.onSort}>
            {label} {sorting}
          </div>
          <div style={{paddingTop: '4px'}}>
            <Input type="text" style={styles.input} onChange={this.props.filter} name={column}  />
          </div>
      </Cell>
    );
  }
}


export default TextFilter;
