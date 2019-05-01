import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createUser, deleteUser } from '../../actions/admin/users';
import _ from 'lodash';
import { Table, Button, Input } from 'react-bootstrap';


class Users extends Component {

  deleteUser = (e, id) => {
    const { dispatch } = this.props;
    dispatch(deleteUser(id));
  };

  createUser = (e) => {
    const { dispatch } = this.props;
    let name = this.refs.name.getValue();
    let username = this.refs.username.getValue();
    let type = this.refs.type.getValue();
    let salesman = this.refs.salesman.getValue();
    let password = this.refs.password.getValue();
    dispatch(createUser(name, username, type, salesman, password));
  };

  getUserType(type) {
    switch (type) {
      case 'admin':
        return 'Admin';
      case 'supervisor':
        return 'Yfirmaður';
      case 'supervisorlimited':
        return 'Yfirmaður -takmarkað';
      case 'salesman':
        return 'Sölumaður';
      case 'salesmanLimited':
        return 'Sölumaður - takmarkað';
      case 'salesmanIceland':
        return 'Sölumaður - Ísland';
      default:
        return type;
    }
  }

  render() {
    const { dispatch } = this.props;

    let salesmen = this.props.salesmen.map(salesman =>
      <option value={salesman._id}>{salesman.name}</option>
    );

    let users = this.props.users.map(user => {
      let salesman = '';
      if(user.salesman && _.find(this.props.salesmen, ['_id', user.salesman])) {
        salesman = _.find(this.props.salesmen, ['_id', user.salesman]).name;
      }

      return(
        <tr>
          <td>{user.name}</td>
          <td>{user.username}</td>
          <td>{this.getUserType(user.type)}</td>
          <td>{salesman}</td>
          <td>****</td>
          <td>
            <Button
              onClick={e => this.deleteUser(e, user._id)}
              bsStyle="primary" style={{height:'35px'}}>
              Eyða
            </Button>
          </td>
        </tr>
      );
    });

    return (
        <Table>
          <thead>
            <tr style={{fontWeight: 'bold'}}>
              <td>Nafn</td>
              <td>Notendanafn</td>
              <td>Tegund</td>
              <td>Tengdur við sölumann</td>
              <td>Lykilorð</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><Input type="text" ref="name" name="name" /></td>
              <td><Input type="text" ref="username" name="username" /></td>
              <td>
                <Input type="select" ref="type">
                  <option value="admin">Admin</option>
                  <option value="supervisor">Yfirmaður</option>
                  <option value="supervisorlimited">Yfirmaður -takmarkað</option>
                  <option value="salesman">Sölumaður</option>
                  <option value="salesmanLimited">Sölumaður - takmarkað</option>
                  <option value="salesmanIceland">Sölumaður - Ísland</option>
                </Input>
              </td>
              <td>
                <Input type="select" ref="salesman">
                  <option value="">Enginn</option>
                  {salesmen}
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
    );
  }
}

function mapStateToProps(state) {
  var users = state.users.items;
  var salesmen = state.salesmen.items;

  return { users, salesmen }
}

export default connect(mapStateToProps)(Users);
