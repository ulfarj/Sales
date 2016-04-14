import React, { Component, PropTypes } from 'react';
import { Input } from 'react-bootstrap';
import {Table, Column, Cell} from 'fixed-data-table';

const styles = {
  input: {
    border: 0
  }
};

class TextFilter extends Component {

  /*shouldComponentUpdate(nextProps, nextState) {
    return false;
  }*/

  render() {

    const { label, column } = this.props;

    return(
      <Cell>
          <div>{label}</div>
          <div style={{paddingTop: '4px'}}>
            <Input type="text" style={styles.input} onChange={this.props.filter} name={column}  />
          </div>
      </Cell>
    );
  }
}

export default TextFilter;
