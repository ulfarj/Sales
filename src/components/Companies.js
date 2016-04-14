import React, { Component, PropTypes } from 'react';
import { Input } from 'react-bootstrap';
import {Table, Column, Cell} from 'fixed-data-table';
import { connect } from 'react-redux';
import Company from './Company';

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
        return(<div>Loading</div>);
    }

 /*
    let companies = this.props.companies.map(company => {

        let sales = company.sales.map(sale => {

          return {
            status: 'status[0].node.name',
            color: 'status[0].node.color',
            //selected: _.indexOf(relay.variables.categories, sale.categoryId) > -1,
            selected: false,
            category: 'category[0].node.name',
            salesman: 'salesman[0].node.name'
          }
        });

        return (
          <Company
            key={company._id}
            company={company}
            sales={sales}
            onClick={this.editCompany} />
          );
    });

    const TextCell = ({rowIndex, data, col, ...props}) => (
      <Cell {...props}>
        {data.getObjectAt(rowIndex)[col]}
      </Cell>
    );

    console.log(this.props.companies);
*/
    const { companies } = this.props;

    return(

        <Table
           rowHeight={30}
           headerHeight={0}
           rowsCount={companies.length}
           width={1000}
           height={500}
           {...this.props}>
          <Column
            cell={props => (
              <Cell {...props}>
                {companies[props.rowIndex].name}
              </Cell>
            )}
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
