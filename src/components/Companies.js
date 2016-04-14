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

    const { loaded } = this.props;

    if(!loaded) {
        return(<div></div>);
    }

    const { companies } = this.props;

    const StatusCell = ({rowIndex}) => (
       <Cell>
           {companies[rowIndex].name}
       </Cell>
     );

    return(

        <Table
           rowHeight={30}
           headerHeight={0}
           rowsCount={companies.length}
           width={1000}
           height={500}
           {...this.props}>
          <Column
            cell={props => (<Cell {...props}>{companies[props.rowIndex].name}</Cell>)}
            fixed={true}
            width={150}
           />
           <Column
             cell={props => (<TextCell {...props} column="name" />)}
             fixed={true}
             width={150}
            />
        </Table>
    )

  }

}

Companies.propTypes = {
  companies: PropTypes.array.isRequired,
  loaded: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  var companies = state.companies.items;

  let loaded = false;

  if(state.companies.loaded) {
    loaded = true;
  }

  return { loaded, companies }
}

export default connect(mapStateToProps)(Companies);
