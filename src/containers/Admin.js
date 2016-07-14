import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentCategories } from '../actions/categories';
import { fetchCurrentSalesmen } from '../actions/salesmen';
import { fetchStatusesIfNeeded } from '../actions/statuses';
import { importCompanies } from '../actions/company';
import { createSalesman } from '../actions/admin/salesmen';
import _ from 'lodash';
import { Table, Button, Input } from 'react-bootstrap';


class Admin extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrentCategories());
    dispatch(fetchCurrentSalesmen());
    dispatch(fetchStatusesIfNeeded());
  }

  deleteSalesman = (e, id) => {

  };

  deleteStatus = (e, id) => {

  };

  deleteCategory = (e, id) => {

  };

  createSalesman = (e) => {
    const { dispatch } = this.props;
    let salesman = this.refs.salesman.getValue();
    if(salesman){      
      dispatch(createSalesman(salesman));
    }
  };


  createCategory = () => {

  };

  createStatus = () => {

  };

  render() {
    const { dispatch, loaded } = this.props;

    if(!loaded) {
      return(<div>Loading</div>);
    }

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

    let statuses = this.props.statuses.map(status =>
      <tr>
        <td>{status.name}</td>
        <td>{status.color}</td>
        <td>
          <Button
            onClick={e => this.deleteStatus(e, status._id)}
            bsStyle="primary" style={{height:'35px'}}>
            Eyða
          </Button>
        </td>
      </tr>
    );

    let categories = this.props.statuses.map(category =>
      <tr>
        <td>{category.name}</td>
        <td>
          <Button
            onClick={e => this.deleteCategory(e, category._id)}
            bsStyle="primary" style={{height:'35px'}}>
            Eyða
          </Button>
        </td>
      </tr>
    );

    return (
      <div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
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
        <div style={{width: '400px'}}>
          <h3>Stöður</h3>
          <Table>
            <tbody>
              <tr>
                <td><Input type="text" ref="status" name="status" /></td>
                <td><Input type="text" ref="color" name="color" /></td>
                <td>
                  <Button
                    onClick={this.createStatus()}
                    bsStyle="primary" style={{height:'35px'}}>
                    Stofna Stöðu
                  </Button>
                </td>
                {statuses}
              </tr>
            </tbody>
          </Table>
        </div>
        <div style={{width: '400px'}}>
          <h3>Flokkar</h3>
          <Table>
            <tbody>
              <tr>
                <td><Input type="text" ref="category" name="category" /></td>
                <td>
                  <Button
                    onClick={this.createCategory()}
                    bsStyle="primary" style={{height:'35px'}}>
                    Stofna Flokk
                  </Button>
                </td>
                {categories}
              </tr>
            </tbody>
          </Table>
        </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  var categories = state.categories.items;
  var salesmen = state.salesmen.items;
  var statuses = state.statuses.items;

  let loaded = false;

  console.log(salesmen);

  if(state.categories.loaded && state.salesmen.loaded && state.statuses.loaded) {
    loaded = true;
  }

  return { loaded, categories, salesmen, statuses}
}

export default connect(mapStateToProps)(Admin);
