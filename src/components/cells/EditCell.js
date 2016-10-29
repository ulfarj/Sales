import React, { Component, PropTypes } from 'react';
import { Input, Button, Glyphicon } from 'react-bootstrap';
import {Table, Column, Cell} from 'fixed-data-table';
import { connect } from 'react-redux';
import { addComment } from '../../actions/company';
import { updateCompanyComment } from '../../actions/companies';

const styles = {
  input: {
    border: '0',
    height: 20,
    lineHeight: 20,
    fontSize: 12,
    padding: 0,
    margin: 0,
  }
};

class EditCell extends Component {

  constructor(props) {
     super(props);
   }

  onClick = (e) => {
    const { dispatch, companies, rowIndex, column } = this.props;
    dispatch(updateCompanyComment(companies[rowIndex]._id, ''));
  };

  onClickIcon = () => {
    const { companies, rowIndex} = this.props;
    this.props.onClick(companies[rowIndex], 3);
  };

  onChange = (e) => {
    const { dispatch, companies, rowIndex, column} = this.props;
    dispatch(updateCompanyComment(companies[rowIndex]._id, e.target.value));
  };

  onKeyPress = (e) => {
    if(e.key == 'Enter'){
      this.updateComment();
    }
  };

  updateComment = () => {
    const { dispatch, companies, rowIndex, column } = this.props;
    let id = companies[rowIndex]['_id'];
    dispatch(addComment(id, companies[rowIndex][column]));
  };

  render() {

    const { loaded, companies, rowIndex, column } = this.props;

    if(!loaded) {
        return(<Cell></Cell>);
    }

    let comment = companies[rowIndex][column];

    return(
      <Cell>
        <div style={{display: 'flex', flexDirection: 'row', width: 150 }}>

          <Input
            type="text"
            style={styles.input}
            value={comment}
            onChange={this.onChange}
            onKeyPress={this.onKeyPress}
            onClick={this.onClick}
            onBlur={this.updateComment}
            ref="xx"
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
