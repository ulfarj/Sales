import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Input, Button} from 'react-bootstrap';

// <Input
//          checked={this.state.statuses.indexOf(status._id) >= 0}
//          onClick={e => this.changeStatus(e)}
//         />

// <Button
//                   onClick={e => this.createCategory(e)}
//                   bsStyle="primary" style={{height:'35px'}}>
//                   Stofna
//                 </Button>

class FocusGroups extends Component {
  render() {
    const { focusGroups } = this.props;
    const groups = this.props.focusGroups.map(group => (
      <Input
        type="checkbox"
        label={group.name}
        value={group._id}
        key={group._id}
      />
    ));
    return (
      <div style={{ padding: 20 }}>
        {groups}
        <Button
          bsStyle="primary"
          style={{ height:'35px' }}
        >
          Stofna
        </Button>
      </div>
    )
  }
}

FocusGroups.propTypes = {
  focusGroups: PropTypes.array.isRequired,
}

export default FocusGroups;

