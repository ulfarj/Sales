import React, { Component, PropTypes } from 'react';
import { Input, Button, Glyphicon } from 'react-bootstrap';
import { Table, Column, Cell } from 'fixed-data-table';
import { connect } from 'react-redux';
import { addComment } from '../../actions/company';
import { updateCompanyComment } from '../../actions/companies';


class CommentCell extends Component {

  constructor(props) {
     super(props);
   }


  onClickIcon = () => {
    const { companies, rowIndex} = this.props;
    this.props.onClick(companies[rowIndex], 3);
  };

  render() {

    const { loaded, companies, rowIndex, column, width } = this.props;

    if(!loaded) {
        return(<Cell></Cell>);
    }

    let comment = companies[rowIndex][column];

    return(
      <Cell>
        <div style={{display: 'flex', flexDirection: 'row', width }}>
          <div style={{ width: 16}}>{comment && "X"}</div>
          <Glyphicon style={{cursor: 'pointer'}} glyph="chevron-up" onClick={this.onClickIcon} />
        </div>
      </Cell>
    );
  }

}

CommentCell.propTypes = {
  companies: PropTypes.array.isRequired,
  loaded: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
}

function mapStateToProps(state, ownProps) {
  var companies = state.companies.items;

  let loaded = false;

  if(state.companies.loaded) {
    loaded = true;
  }
  const width = (state.common.width / 11)

  return { loaded, companies, width }
}

export default connect(mapStateToProps)(CommentCell);
