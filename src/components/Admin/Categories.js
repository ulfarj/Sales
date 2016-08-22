import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createCategory, deleteCategory } from '../../actions/admin/categories';
import _ from 'lodash';
import { Table, Button, Input } from 'react-bootstrap';


class Categories extends Component {

  deleteCategory = (e, id) => {
    const { dispatch } = this.props;
    dispatch(deleteCategory(id));
  };

  createCategory = (e) => {
    const { dispatch } = this.props;
    let category = this.refs.category.getValue();
    if(category){
      dispatch(createCategory(category));
    }
  };

  render() {
    const { dispatch } = this.props;

    let categories = this.props.categories.map(category =>
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
      <div style={{}}>
        <h3>Flokkar</h3>
        <Table>
          <tbody>
            <tr>
              <td><Input type="text" ref="category" name="category" /></td>
              <td>
                <Button
                  onClick={e => this.createCategory(e)}
                  bsStyle="primary" style={{height:'35px'}}>
                  Stofna
                </Button>
              </td>
              {categories}
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  var categories = state.categories.items;
  return { categories }
}

export default connect(mapStateToProps)(Categories);
