import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
//import { createUser } from '../../actions/admin/users';
import _ from 'lodash';
import { Table, Button, Input } from 'react-bootstrap';


class Users extends Component {

  createUser = (e) => {
  };

  render() {
    const { dispatch } = this.props;

    let users = this.props.users.map(user =>
      <tr>
        <td>{user.name}</td>
        <td>{user.type}</td>
        <td>{user.password}</td>
        <td>

        </td>
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
                <Input type="select">
                  <option>Admin</option>
                  <option>Yfirmaður</option>
                  <option>Sölumaður</option>
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
