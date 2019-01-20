import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createFocusGroup, deleteFocusGroup } from '../../actions/admin/focusGroups';
import _ from 'lodash';
import { Table, Button, Input } from 'react-bootstrap';
import { fetchGroups } from '../../actions/focusGroups';


class FocusGroups extends Component {

    deleteStatus = (e, id) => {
      const { dispatch } = this.props;
      dispatch(deleteFocusGroup(id));
    };

      createStatus = (e) => {
        const { dispatch } = this.props;
        let status = this.refs.status.getValue();
        let color = this.refs.color.getValue();
        if(status && color){
         dispatch(createFocusGroup(status, color));
        }
      };

      render() {
        const { dispatch } = this.props;

        let focusGroups = this.props.focusGroups.map(status =>
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
              <thead>
                <tr style={{fontWeight: 'bold'}}>
                  <td>Markhópur</td>
                  <td>Litur</td>
                </tr>
              </thead>
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
                  {focusGroups}
                </tr>
              </tbody>
            </Table>
        );
      }
    }

function mapStateToProps(state) {
  var focusGroups = state.focusGroups.items;
  //const focusGroups = [];
  return { focusGroups };
}

export default connect(mapStateToProps)(FocusGroups);
