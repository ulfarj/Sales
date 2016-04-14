import React, { Component, PropTypes } from 'react';
import ReactDOM from "react-dom";
import {Table, Input, Fade, Button, Well, ButtonToolbar, Overlay, Popover, Panel, Modal, Grid, Row, Col} from 'react-bootstrap';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchCategoriesIfNeeded } from '../actions/categories';
import { fetchCompanies } from '../actions/companies';
//import Company from './Company';
import Companies from './Companies';
import Filter from './Filter';

const styles = {
  input: {
    border: 0
  },
  tbody: {
    border: 0
  },
  gridArea: {
    paddingTop: 20
  },
  headerArea: {
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  editDialog: {
    width: '90%'
  }
};

class Main extends Component {

	 constructor(props) {
	    super(props);
	    this.state = {
        showSelectCategories: false,
        filter: {},
      }

      this.filter = _.debounce(this.filter, 300);
  	}

    componentWillMount(){
      const { dispatch } = this.props;
       dispatch(fetchCategoriesIfNeeded());
       dispatch(fetchCompanies({}));
    }

    filterRow = (e) => {
      var filter = this.state.filter;
      filter[e.target.name] = e.target.value;
      this.filter(filter);
    };

    filter = (filter) => {
      const { dispatch } = this.props;
      dispatch(fetchCompanies(filter));
    };

    changeCategory = (e) => {

      /*
      const { relay, store } = this.props;

      var categories = relay.variables.categories;

      if(e.target.checked) {
        categories.push(e.target.value);
      }
      else{
        categories.splice(_.indexOf(categories, e.target.value), 1);
      }

      let empt = [];
      relay.setVariables({categories, empt});
      relay.setVariables({categories, categories});*/
    };

    toggleAllCategories = (e) => {

     /*
      const { relay, store } = this.props;

      var showAllCategories = !relay.variables.showAllCategories;

      relay.setVariables({showAllCategories: showAllCategories});

      let categories = [];

      if(showAllCategories){
         categories = store.categoryConnection.edges.map(edge => {
          return edge.node.id;
        });
      }

      relay.setVariables({categories, categories}); */
    };

    editCompany = (companyId) => {

     /*
      const { relay } = this.props;

      relay.setVariables({showEditModal: true});
      relay.setVariables({editCompanyId: companyId});              */
    };

    onCreateCompany = () => {
      /*const { relay } = this.props;

      relay.setVariables({showCreateCompanyModal: false});*/
    };

  	render() {

      const { loaded } = this.props;

      if(!loaded) {
          return(<div>Loading</div>);
      }

      let categories = this.props.categories.map(category => {
          return (
              <Col>
               <Input
                key={category.id}
                type="checkbox"
                label={category.name}
                value={category.id}
                //checked={relay.variables.categories.indexOf(edge.node.id) >= 0}
                //checked={categories.indexOf(category.id) >= 0}
                onClick={e => this.changeCategory(e)}  />
             </Col>
            );
      });


  		return (
  			<div>

           <div style={styles.headerArea}>
              <div style={{width: 120}}>
                <Button
                  bsStyle="primary"
                  onClick={e => this.setState({showSelectCategories: !this.state.showSelectCategories})}
                  >
                    Velja flokka
                </Button>
              </div>

              <div style={{width: 100}}>
                <Button
                  //onClick={e => relay.setVariables({showCreateCompanyModal: true})}
                  bsStyle="primary">
                    Skrá fyrirtæki
                </Button>
                <Modal
                  //show={relay.variables.showCreateCompanyModal}
                  //onHide={e => relay.setVariables({showCreateCompanyModal: false})}
                  bsSize="lg">
                  <Modal.Header closeButton>
                    <Modal.Title>Skrá fyrirtæki</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>

                  </Modal.Body>
                </Modal>
              </div>

              <div>
                <Modal
                  //show={relay.variables.showEditModal}
                  //onHide={e => relay.setVariables({showEditModal: false})}
                  bsSize="lg">
                  <Modal.Header closeButton>
                    <Modal.Title>Verk</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>

                  </Modal.Body>
                </Modal>
              </div>

              <div style={{paddingLeft: '40', width: 300}}>
                <label>
                  <h4>
                    Fjöldi færslna:
                  </h4>
                </label>
              </div>
           </div>

            <div>
              <div>
                <Panel
                    collapsible
                    expanded={this.state.showSelectCategories}
                    >
                  <Grid>
                    <Row>
                      <Col>
                        <Input
                          type="checkbox"
                          label='Sýna alla flokka'
                          value='showall'
                          //checked={relay.variables.showAllCategories}
                          onClick={e => this.toggleAllCategories(e)} />
                      </Col>
                      {categories}
                    </Row>
                  </Grid>
                </Panel>
              </div>
           </div>

           <div style={styles.gridArea}>
              <Filter filter={this.filter} />
              <Companies />
           </div>
        </div>
  		);
  	}
}

Main.propTypes = {
  categories: PropTypes.array.isRequired,
  loaded: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  var categories = state.categories.items;

  let loaded = false;

  if(state.categories.loaded) {
    loaded = true;
  }

  return { loaded, categories}
}

export default connect(mapStateToProps)(Main);
