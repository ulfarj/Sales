import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { deleteCategoryStatuses } from '../../actions/admin/categories';
import _ from 'lodash';
import { Table, Button, Input, Modal } from 'react-bootstrap';


class ResetStatuses extends Component {

  constructor(props){
    super(props);
    this.state = {
      showModal: false,
      category: '',
      invalidname: null,
      loading: false,
    }
  }

  resetStatuses = (e) => {
    const { categories } = this.props;
    const category = _.find(categories, ['_id', this.refs.category.getValue()]).name;    
    this.setState({ category });
    this.setState({ showModal: true});        
  };

  reset = (e) => {
    const { dispatch } = this.props;
    const category = this.refs.category.getValue();
    const periodname = this.refs.periodname.getValue();  
    if(category && periodname && periodname.length > 0) {
      //All nema já, hættir, sagt upp
      const filteredStatuses = this.props.statuses.filter(status => 
        (status.name !== "Já" && status.name !== "Hættir" && status.name !== "Sagt upp")
      );
      const statuses = filteredStatuses.map(status => status._id);

      dispatch(deleteCategoryStatuses(category, periodname, statuses));
      this.setState({ showModal: false });      
    } else {
      this.setState({ invalidname: true })
    }
  }

  render() {

    const { dispatch, resetDone, isResetting } = this.props;


    let categories = this.props.categories.map(category =>
      <option value={category._id}>
        {category.name}
      </option>        
    );

    return (
        <div style={{ paddingTop: 20, paddingBottom: 20 }}>            
            <Modal
              show={this.state.showModal}
              onHide={e => this.setState({showModal: false})}
              bsSize="lg">
              <Modal.Header closeButton>
                <Modal.Title>Núllstilla stöður fyrir flokk {this.state.category}</Modal.Title>
              </Modal.Header>
              <Modal.Body>                
                <div>
                  <Input
                    type="text"
                    ref="periodname"
                    label="Nafn núverandi tímabils"
                    style={{ maxWidth: 360 }}
                    bsStyle={this.state.invalidname ? 'error' : ''}
                  />
                </div>
                <div>
                  <Button
                      onClick={e => this.reset(e)}
                      bsStyle="primary" style={{ height:'35px' }}>
                      Núllstilla
                  </Button>
                </div>
              </Modal.Body>
            </Modal>
            <Input type="select" ref="category">                
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
    const categories = state.categories.items;
    const resetDone = state.categories.resetDone;
    const isResetting = state.categories.isResetting;
    const statuses = state.statuses.items;
    return { categories, resetDone, isResetting, statuses }
}

export default connect(mapStateToProps)(ResetStatuses);
