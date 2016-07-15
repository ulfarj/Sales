import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSalesman, deleteSalesman } from '../../actions/admin/salesmen';
import _ from 'lodash';
import { Table, Button, Input } from 'react-bootstrap';


class Salesmen extends Component {

  deleteSalesman = (e, id) => {
    const { dispatch } = this.props;
    dispatch(deleteSalesman(id));
  };

  createSalesman = (e) => {
    const { dispatch } = this.props;
    let salesman = this.refs.salesman.getValue();
    if(salesman){
      dispatch(createSalesman(salesman));
    }
  };

  render() {
    const { dispatch } = this.props;

    let salesmen = this.props.salesmen.map(salesman =>
      <tr>
        <td>{salesman.name}</td>
        <td>
          <Button
            onClick={e => this.deleteSalesman(e, salesman._id)}
            bsStyle="primary" style={{height:'35px'}}>
            Eyða
          </Button>
        </td>
      </tr>
    );

    return (
        <div style={{width: '400px'}}>
          <h3>Sölumenn</h3>
          <Table>
            <tbody>
              <tr>
                <td>
                  <Input type="text" ref="salesman" name="salesman" />
                </td>
                <td>
                  <Button
                    onClick={e => this.createSalesman(e)}
                    bsStyle="primary" style={{height:'35px'}}>
                    Stofna Sölumann
                  </Button>
                </td>
              </tr>
              {salesmen}
            </tbody>
          </Table>
        </div>
    );
  }
}

function mapStateToProps(state) {
  var salesmen = state.salesmen.items;
  return { salesmen }
}

export default connect(mapStateToProps)(Salesmen);
