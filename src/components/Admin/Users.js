import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../../actions/admin/users';
import _ from 'lodash';
import { Table, Button, Input } from 'react-bootstrap';


class Users extends Component {

  createUser = (e) => {
    const { dispatch } = this.props;
    let name = this.refs.name.getValue();
    let type = this.refs.type.getValue();
    let password = this.refs.password.getValue();
    dispatch(createUser(name, type, password));
  };

  getUserType(type) {
    switch (type) {
      case 'admin':
        return 'Admin';
      case 'supervisor':
        return 'Yfirmaður';
      case 'salesman':
        return 'Sölumaður'
      default:
        return type;
    }
  }

  render() {
    const { dispatch } = this.props;

    let users = this.props.users.map(user =>
      <tr>
        <td>{user.name}</td>
        <td>
        {
          this.getUserType(user.type)
        }
        </td>
        <td>{user.password}</td>
        <td></td>
      </tr>
    );

    return (
      <div style={{ }}>
        <h3>Notendur</h3>
        <Table>
          <tbody>
            <tr>
              <td><Input type="text" ref="name" name="name" /></td>
              <td>
                <Input type="select" ref="type">
                  <option value="admin">Admin</option>
                  <option value="supervisor">Yfirmaður</option>
                  <option value="salesman">Sölumaður</option>
                </Input>
              </td>
              <td><Input type="password" ref="password" name="password" style={{ width: '60px'}} /></td>
              <td>
                <Button
                  onClick={e => this.createUser(e)}
                  bsStyle="primary" style={{height:'35px'}}>
                  Stofna
                </Button>
              </td>
            </tr>
            {users}
          </tbody>
        </Table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  var users = state.users.items;
  return { users }
}

export default connect(mapStateToProps)(Users);
