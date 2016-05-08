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


class SalesmanFilter extends Component {

  constructor(props) {
    super(props);

    this.state = {
      filter: {},
      salesmen: [],
      open: false,
    };
  }

  componentWillMount = () => {
    const {dispatch} = this.props;

    let salesmen = this.props.salesmen.map(salesman => {
        return salesman._id;
    });

    this.setState({salesmen: salesmen});
  };

  changeSalesman = (e) => {

    var salesmen = this.state.salesmen;

    if(e.target.checked) {
      salesmen.push(e.target.value);
    }
    else{
      salesmen.splice(_.indexOf(salesmen, e.target.value), 1);
    }

    this.setSalesmen(salesmen);
  };

  setSalesmen = (salesmen) => {
    this.setState({salesmen, salesmen});
    //var filter = this.state.filter;
    this.props.filter('salesmen', salesmen);
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

    let salesmen = this.props.salesmen.map(salesman => {
      return (
        <Input
         key={salesman._id}
         type="checkbox"
         label={salesman.name}
         value={salesman._id}
         checked={this.state.salesmen.indexOf(salesman._id) >= 0}
         onClick={e => this.changeSalesman(e)}
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
                Sölumaður
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
             {salesmen}
            </div>
          </Popover>
          </div>
        </div>
      </Cell>
    );
  }
}

SalesmanFilter.propTypes = {
  statuses: PropTypes.array.isRequired,
  salesmen: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  let statuses = state.statuses.items;
  let salesmen = state.salesmen.items;

  return { statuses, salesmen }
}

export default connect(mapStateToProps)(SalesmanFilter);
