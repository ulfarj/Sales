import React, { Component, PropTypes } from 'react';
import { Input, Button} from 'react-bootstrap';
import {Table, Column, Cell} from 'fixed-data-table';
import Multiselect from 'react-bootstrap-multiselect';
import { connect } from 'react-redux';
import Popover from 'material-ui/lib/popover/popover';
import RaisedButton from 'material-ui/lib/raised-button';


const styles = {
  input: {
    border: 0
  },
  popover: {
    padding: 20,
  },
};


class FocusGroupFilter extends Component {

  constructor(props) {
    super(props);

    this.state = {
      filter: {},
      items: [],
      open: false,
      showAll: true,
    };
  }

  componentWillMount = () => {
    const {dispatch} = this.props;

    let items = this.props.items.map(item => {
        return item._id;
    });

    this.setState({ items });
  };

  changeItem = (e) => {

    const items = this.state.items;

    if(e.target.checked) {
      items.push(e.target.value);
    }
    else{
      items.splice(_.indexOf(salesmen, e.target.value), 1);
    }

    this.setItems(items);
  };

  setItems = (items) => {
    this.setState({ items });
    this.props.filter('focusGroups', items);
  };


  toggleAll = (e) => {

    var showAll = !this.state.showAll;

    let items = [];

    if(showAll){
       items = this.props.items.map(item => {
        return item._id;
      });
    }

    this.setState({ showAll: showAll });
    this.setItems(items);
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

    let items = this.props.items.map(item => {
      return (
        <Input
         key={item._id}
         type="checkbox"
         label={item.name}
         value={item._id}
         checked={this.state.items.indexOf(item._id) >= 0}
         onClick={e => this.changeItem(e)}
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
                MH
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
               {items}
            </div>
          </Popover>
          </div>
        </div>
      </Cell>
    );
  }
}

FocusGroupFilter.propTypes = {
  items: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const items = state.focusGroups.items;

  return { items }
}

export default connect(mapStateToProps)(FocusGroupFilter);
