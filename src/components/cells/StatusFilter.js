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


class StatusFilter extends Component {

  constructor(props) {
    super(props);

    this.state = {
      statuses: [],
      open: false,
      showAll: true,
    };
  }

  componentWillMount = () => {
    const {dispatch} = this.props;

    let statuses = this.props.statuses.map(status => {
        return status._id;
    });

    this.setState({statuses: statuses});
    this.props.filter('statuses', statuses);
  };

  changeStatus = (e) => {

    var statuses = this.state.statuses;

    if(e.target.checked) {
      statuses.push(e.target.value);
    }
    else{
      statuses.splice(_.indexOf(statuses, e.target.value), 1);
    }

    this.setStatuses(statuses);
  };

  setStatuses = (statuses) => {
    this.setState({statuses, statuses});
    this.props.filter('statuses', statuses);
  };

  toggleAll = (e) => {

    var showAll = !this.state.showAll;

    let statuses = [];

    if(showAll){
       statuses = this.props.statuses.map(status => {
        return status._id;
      });
    }

    this.setState({showAll: showAll});
    this.setStatuses(statuses);
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

    let statuses = this.props.statuses.map(status => {
      return (
        <Input
         key={status._id}
         type="checkbox"
         label={status.name}
         value={status._id}
         checked={this.state.statuses.indexOf(status._id) >= 0}
         onClick={e => this.changeStatus(e)}
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
                Staða
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
              {statuses}
            </div>
          </Popover>
          </div>
        </div>
      </Cell>
    );
  }
}

StatusFilter.propTypes = {
  statuses: PropTypes.array.isRequired,
  salesmen: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  let statuses = state.statuses.items;
  let salesmen = state.salesmen.items;

  return { statuses, salesmen }
}

export default connect(mapStateToProps)(StatusFilter);
