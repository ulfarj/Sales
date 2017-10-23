import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStatus, deleteStatus } from '../../actions/admin/statuses';
import _ from 'lodash';
import { Table, Button, Input } from 'react-bootstrap';


class ResetStatuses extends Component {

  resetStatuses = (e) => {
    //All nema já, hættir, sagt upp    
  };

  render() {

    const { dispatch } = this.props;

    let categories = this.props.categories.map(category =>
      <option value={category._id}>
        {category.name}
      </option>        
    );

    return (
        <div style={{ paddingTop: 20, paddingBottom: 20 }}>            
            <Input type="select" ref="salesman">
                <option value="">Veljið flokk</option>
                {categories}
            </Input>              
              
             <Button
                onClick={e => this.resetStatuses(e)}
                bsStyle="primary" style={{ height:'35px', paddingLeft: 20 }}>
                Núllstilla stöður
             </Button>             
        </div>
    );
  }
}

function mapStateToProps(state) {
    var categories = state.categories.items;
    return { categories }
}

export default connect(mapStateToProps)(ResetStatuses);
