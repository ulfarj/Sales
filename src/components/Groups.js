import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setGroups, fetchGroups } from '../actions/groups';
import _ from 'lodash';
import { Table, Button, Input } from 'react-bootstrap';


class Groups extends Component {

  componentWillMount = () => {
    const { dispatch } = this.props;
    dispatch(fetchGroups());
  }

  deleteGroup = (e, id) => {
    const { dispatch } = this.props;
    //dispatch(deleteGroup(id));
  };

  addGroup = (e) => {
    const { dispatch, company } = this.props;
    const group = {
      maingroup: this.refs.maingroup.getValue(),
      subgroup: this.refs.subgroup.getValue(),
      companyId: company._id,
    };

    if(group.maingroup !== 'choose' && group.subgroup !== 'choose') {
      dispatch(setGroups(group));
      this.props.onUpdate();
    }
  };

  render() {
    const { dispatch, company, groups } = this.props;

    const mainGroups = _.filter(groups, { 'type': 'Yfirflokkur'}).map(group =>
      <option value={group.name}>{group.name}</option>
    );

    const subGroups = _.filter(groups, { 'type': 'Undirflokkur'}).map(group =>
      <option value={group.name}>{group.name}</option>
    );

    return (
        <div style={{}}>
          <h3>Flokkar</h3>
          <Table>
            <tbody>
              <tr>
                <td>
                  <Input label="Yfirflokkur" type="select" ref="maingroup" style={{width: '160px'}}>
                    <option value='choose'>Veljið yfirflokk</option>
                    {mainGroups}
                  </Input>
                </td>
                <td>
                  <Input label="Undirflokkur" type="select" ref="subgroup" style={{width: '160px'}}>
                    <option value='choose'>Veljið undirflokk</option>
                    {subGroups}
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
