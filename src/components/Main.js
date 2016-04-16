import React, { Component, PropTypes } from 'react';
import ReactDOM from "react-dom";
import {Table, Input, Fade, Button, Well, ButtonToolbar, Overlay, Popover, Panel, Modal, Grid, Row, Col} from 'react-bootstrap';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchCategoriesIfNeeded } from '../actions/categories';
import { fetchSalesmenIfNeeded } from '../actions/salesmen';
import { fetchCompanies } from '../actions/companies';
import Companies from './Companies';
import Filter from './Filter';
import CreateCompany from './CreateCompany';

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
        showCreateCompanyModal: false,
        filter: {},
        categories: []
      }

      this.filter = _.debounce(this.filter, 300);
  	}

    componentWillMount(){
      const { dispatch } = this.props;
       dispatch(fetchCategoriesIfNeeded());
       dispatch(fetchSalesmenIfNeeded());
       dispatch(fetchCompanies({}));
    }

    filter = (filter) => {
      const { dispatch } = this.props;
      dispatch(fetchCompanies(filter));
    };

    changeCategory = (e) => {

      var categories = this.state.categories;

      if(e.target.checked) {
        categories.push(e.target.value);
      }
      else{
        categories.splice(_.indexOf(categories, e.target.value), 1);
      }

      this.setCategories(categories);
    };

    toggleAllCategories = (e) => {

      var showAllCategories = !this.state.showAllCategories;

      this.setState({showAllCategories: showAllCategories});

      let categories = [];

      if(showAllCategories){
         categories = this.props.categories.map(category => {
          return category._id;
        });
      }

      this.setCategories(categories);
    };

    setCategories = (categories) => {
      this.setState({categories, categories});
      var filter = this.state.filter;
      filter['categories'] = categories;
      this.filter(filter);
    };

    editCompany = (companyId) => {

     /*
      const { relay } = this.props;

      relay.setVariables({showEditModal: true});
      relay.setVariables({editCompanyId: companyId});              */
    };

    onCreateCompany = () => {
      const { dispatch } = this.props;
      dispatch(fetchCompanies());
      this.setState({showCreateCompanyModal: false});
    };

  	render() {

      const { loaded, companiesCount } = this.props;

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
                value={category._id}
                checked={this.state.categories.indexOf(category._id) >= 0}
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
                  onClick={e => this.setState({showCreateCompanyModal: true})}
                  bsStyle="primary">
                    Skrá fyrirtæki
                </Button>
                <Modal
                  show={this.state.showCreateCompanyModal}
                  onHide={e => this.setState({showCreateCompanyModal: false})}
                  bsSize="lg">
                  <Modal.Header closeButton>
                    <Modal.Title>Skrá fyrirtæki</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <CreateCompany
                      onCreate={this.onCreateCompany}
                      />
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
                    Fjöldi færslna: {companiesCount}
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
              <Companies filter={this.filter} rowCount={companiesCount} />
           </div>
        </div>
  		);
  	}
}

Main.propTypes = {
  companiesCount: PropTypes.number.isRequired,
  categories: PropTypes.array.isRequired,
  salesmen: PropTypes.array.isRequired,
  loaded: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  var categories = state.categories.items;
  var companies = state.companies.items;
  var salesmen = state.salesmen.items;

  let loaded = false;

  if(state.categories.loaded && state.salesmen.loaded) {
    loaded = true;
  }

  let companiesCount = 0;

  if(state.companies.loaded) {
    companiesCount = state.companies.items.length;
  }

  return { loaded, categories, salesmen, companiesCount}
}

export default connect(mapStateToProps)(Main);
