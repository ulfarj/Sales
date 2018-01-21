import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setGroups, fetchGroups } from '../actions/groups';
import _ from 'lodash';
import { Table, Button, Input } from 'react-bootstrap';


class Groups extends Component {

  constructor(props) {
     super(props);
     this.state = {
       parent: null,
       subparent: null,
     }
  }

  // componentWillMount = () => {
  //   const { dispatch } = this.props;
  //   dispatch(fetchGroups());
  // }

  deleteGroup = (e, id) => {
    const { dispatch } = this.props;
    //dispatch(deleteGroup(id));
  };

  addGroup = (e) => {
    const { dispatch, company } = this.props;
    const group = {
      maingroup: this.refs.maingroup.getValue(),
      subgroup: this.refs.subgroup.getValue(),
      subsubgroup: this.refs.subsubgroup.getValue(),
      companyId: company._id,
    };

    if(group.maingroup !== 'choose' && group.subgroup !== 'choose') {
      dispatch(setGroups(group));
      this.props.onUpdate();
    }
  };

  setMainGroup = () => {
    this.setState({parent: this.refs.maingroup.getValue()});
  }

  setSubGroup = () => {
    this.setState({subparent: this.refs.subgroup.getValue()});
  }

  getSubGroups = () => {
    const subGroups = _.filter(groups, { 'type': 'Undirflokkur', 'parent': this.state.parent}).map(group =>
      <option value={group.name}>{group.name}</option>
    );
    return subGroups;
  }

  render() {
    const { dispatch, company, groups } = this.props;

    const mainGroups = _.filter(groups, { 'type': 'Yfirflokkur'}).map(group =>
      <option value={group.name}>{group.name}</option>
    );

    const subGroups = _.filter(groups, { 'type': 'Undirflokkur', 'parent': this.state.parent}).map(group =>
      <option value={group.name}>{group.name}</option>
    );

    const subSubGroups = _.filter(groups, { 'type': 'Undirundirflokkur', 'parent': this.state.subparent}).map(group =>
      <option value={group.name}>{group.name}</option>
    );

    return (
        <div style={{}}>
          <h3>Flokkar</h3>
          <Table>
            <tbody>
              <tr>
                <td>
                  <Input
                    label="Yfirflokkur"
                    type="select"
                    ref="maingroup"
                    style={{width: '160px'}}
                    onChange={this.setMainGroup}
                  >
                    <option value='choose'>Veljið yfirflokk</option>
                    {mainGroups}
                  </Input>
                </td>
                <td>
                  <Input
                    label="Undirflokkur"
                    type="select"
                    ref="subgroup"
                    style={{width: '160px'}}
                    onChange={this.setSubGroup}
                  >
                    <option value='choose'>Veljið undirflokk</option>
                    {subGroups}
                  </Input>
                </td>
                <td>
                  <Input
                    label="Undir undirflokkur"
                    type="select"
                    ref="subsubgroup"
                    style={{width: '160px'}}
                  >
                    <option value='choose'>Veljið undir undirflokk</option>
                    {subSubGroups}
                  </Input>
                </td>
                <td style={{ paddingTop: 20 }}>
                  <Button
                    onClick={e => this.addGroup(e)}
                    bsStyle="primary" style={{height:'35px'}}>
                    Uppfæra
                  </Button>
                </td>
              </tr>
              <tr>
                <td>{company.maingroup}</td>
                <td>{company.subgroup}</td>
                <td>{company.subsubgroup}</td>
              </tr>
            </tbody>
          </Table>
        </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const groups = state.groups.items;
  const company = ownProps.company;
  return { groups, company }
}

export default connect(mapStateToProps)(Groups);
