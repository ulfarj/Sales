import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createGroup, deleteGroup, fetchGroups } from '../../actions/groups';
import _ from 'lodash';
import { Table, Button, Input } from 'react-bootstrap';


class Groups extends Component {

  constructor(props) {
     super(props);
     this.state = {
       showMainGroups: false,
       type: 'Yfirflokkur',
     }
  }

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
      parent: (this.refs.parent ? this.refs.parent.getValue() : null),
    };
    if(group.name){
      dispatch(createGroup(group));
    }
  };

  onChange = (e) => {

    this.setState(
      {
        showMainGroups: (this.refs.type.getValue() !== 'Yfirflokkur'),
        type: this.refs.type.getValue() === 'Undirflokkur' ? 'Yfirflokkur' : 'Undirflokkur',
      }
    );
  };

  render() {
    const { dispatch } = this.props;

    let groups = this.props.groups.map(group =>
      <tr>
        <td>{group.name}</td>
        <td>{group.type}</td>
        <td>{group.parent}</td>
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
          <Table>
            <thead>
              <th>Nafn</th>
              <th>Tegund flokks</th>
              <th>Yfirflokkur</th>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Input type="text" ref="name" name="name" />
                </td>
                <td>
                  <Input
                    type="select"
                    ref="type"
                    style={{width: '160px'}}
                    onChange={this.onChange}
                  >
                    <option value="Yfirflokkur">Yfirflokkur</option>
                    <option value="Undirflokkur">Undirflokkur</option>
                    <option value="Undirundirflokkur">Undir undirflokkur</option>
                  </Input>
                </td>
                <td>
                  {this.state.showMainGroups &&
                    <Input type="select" ref="parent" style={{width: '160px'}}>
                      {_.filter(this.props.groups, ['type', this.state.type]).map(group =>
                        <option value={group.name}>{group.name}</option>
                      )}
                    </Input>
                  }
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
    );
  }
}

function mapStateToProps(state) {
  var groups = state.groups.items;
  return { groups }
}

export default connect(mapStateToProps)(Groups);
