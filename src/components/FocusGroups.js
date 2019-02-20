import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Input, Button} from 'react-bootstrap';


class FocusGroups extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount = () => {
    const { items } = this.props;
    this.setState({ items });
  };

  toggle = (e) => {
    const { value } = e.target;
    const { items } = this.state;
    const index = items.indexOf(value);
    if(index === -1) {
      items.push(value);
    } else {
      items.splice(index, 1);
    }
    this.setState({ items });
  }

  set = () => {
    const { handleSubmit } = this.props;
    const { items } = this.state;
    handleSubmit(items);
  }

  render() {
    const { focusGroups } = this.props;
    const { items } = this.state;

    const groups = focusGroups.map(group => (
      <Input
        type="checkbox"
        label={group.name}
        value={group._id}
        key={group._id}
        checked={items.indexOf(group._id) !== -1}
        onClick={this.toggle}
      />
    ));
    return (
      <div style={{ padding: 20 }}>
        {groups}
        <Button
          bsStyle="primary"
          style={{ height:'35px' }}
          onClick={this.set}
        >
          Uppfæra
        </Button>
      </div>
    )
  }
}

FocusGroups.defaultProps = {
  items: [],
}

FocusGroups.propTypes = {
  focusGroups: PropTypes.array.isRequired,
  items: PropTypes.array,
  handleSubmit: PropTypes.func.isRequired,
}

export default FocusGroups;

