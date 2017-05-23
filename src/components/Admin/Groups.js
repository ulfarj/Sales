import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createGroup, deleteGroup, fetchGroups } from '../../actions/groups';
import _ from 'lodash';
import { Table, Button, Input } from 'react-bootstrap';


class Groups extends Component {

  componentWillMount = () => {
    const { dispatch } = this.props;
    dispatch(fetchGroups());
  }

  deleteGroup = (e, id) => {
    const { dispatch } = this.props;
    dispatch(deleteGroup(id));
  };

  createGroup = (e) => {
    const { dispatch } = this.props;
    const group = {
      name: this.refs.name.getValue(),
      type: this.refs.type.getValue(),
    };
    if(group.name){
      dispatch(createGroup(group));
    }
  };

  render() {
    const { dispatch } = this.props;

    let groups = this.props.groups.map(group =>
      <tr>
        <td>{group.name}</td>
        <td>{group.type}</td>
        <td>
          <Button
            onClick={e => this.deleteGroup(e, group._id)}
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
                <td>
                  <Input type="text" ref="name" name="name" />
                </td>
                <td>
                  <Input type="select" ref="type" style={{width: '160px'}}>
                    <option value="Yfirflokkur">Yfirflokkur</option>
                    <option value="Undirflokkur">Undirflokkur</option>
                  </Input>
                </td>
                <td>
                  <Button
                    onClick={e => this.createGroup(e)}
                    bsStyle="primary" style={{height:'35px'}}>
                    Stofna
                  </Button>
                </td>
              </tr>
              {groups}
            </tbody>
          </Table>
        </div>
    );
  }
}

function mapStateToProps(state) {
  var groups = state.groups.items;
  return { groups }
}

export default connect(mapStateToProps)(Groups);