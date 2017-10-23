import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStatus, deleteStatus } from '../../actions/admin/statuses';
import _ from 'lodash';
import { Table, Button, Input } from 'react-bootstrap';


class Statuses extends Component {

  deleteStatus = (e, id) => {
    const { dispatch } = this.props;
    dispatch(deleteStatus(id));
  };

  createStatus = (e) => {
    const { dispatch } = this.props;
    let status = this.refs.status.getValue();
    let color = this.refs.color.getValue();
    if(status && color){
      dispatch(createStatus(status, color));
    }
  };

  render() {
    const { dispatch } = this.props;

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

    return (
        <Table>
          <tbody>
            <tr>
              <td><Input type="text" ref="status" name="status" /></td>
              <td><Input type="text" ref="color" name="color" /></td>
              <td>
                <Button
                  onClick={e => this.createStatus(e)}
                  bsStyle="primary" style={{height:'35px'}}>
                  Stofna
                </Button>
              </td>
              {statuses}
            </tr>
          </tbody>
        </Table>
    );
  }
}

function mapStateToProps(state) {
  var statuses = state.statuses.items;
  return { statuses }
}

export default connect(mapStateToProps)(Statuses);
