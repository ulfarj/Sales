import React, { Component, PropTypes } from 'react';
import { Input, Button, Glyphicon } from 'react-bootstrap';
import {Table, Column, Cell} from 'fixed-data-table';
import { connect } from 'react-redux';
import { addComment } from '../../actions/company';

const styles = {
  input: {
    border: '0',
    height: '20px',

  }
};

class EditCell extends Component {

  constructor(props) {
     super(props);
     this.state = {
       comment: '',
     }
   }

  componentWillMount = () => {
    const { companies, rowIndex, column } = this.props;
    this.setState({comment: companies[rowIndex][column]});
  };

  onClick = (e) => {
    this.setState({comment: ''});
  };

  onClickIcon = () => {
    const { companies, rowIndex} = this.props;
    this.props.onClick(companies[rowIndex], 3);
  };

  onChange = (e) => {
    let comment = e.target.value;
    this.setState({comment: comment});
  };

  onKeyPress = (e) => {
    if(e.key == 'Enter'){
      this.updateComment();
    }
  };

  updateComment = () => {
    const { dispatch, companies, rowIndex, column } = this.props;

    let id = companies[rowIndex]['_id'];
    dispatch(addComment(id, this.state.comment));
  };

  render() {

    const { loaded, companies, rowIndex, column } = this.props;

    if(!loaded) {
        return(<Cell></Cell>);
    }

    return(
      <Cell>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <Input
           type="text"
           style={styles.input}
           value={this.state.comment}
           onChange={this.onChange}
           onKeyPress={this.onKeyPress}
           onClick={this.onClick}
          />
          <Glyphicon style={{cursor: 'pointer'}} glyph="chevron-up" onClick={this.onClickIcon} />
        </div>
      </Cell>
    );
  }

}

EditCell.propTypes = {
  companies: PropTypes.array.isRequired,
  loaded: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  var companies = state.companies.items;

  let loaded = false;

  if(state.companies.loaded) {
    loaded = true;
  }

  return { loaded, companies }
}

export default connect(mapStateToProps)(EditCell);
