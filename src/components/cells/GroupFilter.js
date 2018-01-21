import React, { Component, PropTypes } from 'react';
import { Input, Button} from 'react-bootstrap';
import {Table, Column, Cell} from 'fixed-data-table';
import Multiselect from 'react-bootstrap-multiselect';
import { connect } from 'react-redux';
import Popover from 'material-ui/lib/popover/popover';
import RaisedButton from 'material-ui/lib/raised-button';
import { setFilter } from '../../actions/companies';


const styles = {
  input: {
    border: 0
  },
  popover: {
    padding: 20,
  },
};


class GroupFilter extends Component {

  constructor(props) {
    super(props);

    this.state = {
      filter: {},
      groups: [],
      open: false,
      showAll: true,
    };
  }

  componentDidMount = () => {
  };

  componentWillReceiveProps = (nextProps) => {
    const { dispatch } = this.props;
    const groups = nextProps.groups.map(group => {
        return group._id;
    });

    this.setState({groups: groups});
  }

  changeGroups = (e) => {

    var groups = this.state.groups;

    if(e.target.checked) {
      groups.push(e.target.value);
    }
    else{
      groups.splice(_.indexOf(groups, e.target.value), 1);
    }

    this.setGroups(groups);
  };

  setGroups = (groups) => {
    this.setState({ groups });
    this.props.filter(this.props.column, groups);
  };

  toggleAll = (e) => {
    var showAll = !this.state.showAll;

    let groups = [];

    if(showAll){
       groups = this.props.groups.map(group => {
        return group._id;
      });
    }

    this.setState({showAll: showAll});
    this.setGroups(groups);
  };

  handleTouchTap = (event) => {

   this.setState({
     open: true,
     anchorEl: event.currentTarget,
   });
 };

 handleRequestClose = () => {
   this.setState({
     open: false,
   });
 };

  render() {

    const { label, column } = this.props;

    const groups = this.props.groups.map(group => {
      return (
        <Input
         key={group._id}
         type="checkbox"
         label={group.name}
         value={group._id}
         checked={this.state.groups.indexOf(group._id) >= 0}
         onClick={e => this.changeGroups(e)}
        />
      );
    });

    return(
      <Cell>
        <div style={{paddingTop: '15px'}}>

          <div>
            <Button
              bsStyle="secondary"
              onClick={this.handleTouchTap}>
                Flokkar
            </Button>
          </div>

          <div>
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
          >
             <div style={{padding: '10px'}}>
               <Input
                 type="checkbox"
                 label='Sýna allt'
                 value='showall'
                 checked={this.state.showAll}
                 onClick={e => this.toggleAll(e)} />
               {groups}
            </div>
          </Popover>
          </div>
        </div>
      </Cell>
    );
  }
}

GroupFilter.propTypes = {
  groups: PropTypes.array.isRequired,
  column: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  const groups = state.groups.items;
  const column = ownProps.column;

  return { groups, column }
}

export default connect(mapStateToProps)(GroupFilter);
