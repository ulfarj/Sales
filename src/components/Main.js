import React, { Component, PropTypes } from 'react';
import ReactDOM from "react-dom";
import {Table, Input, Fade, Button, Well, ButtonToolbar, Overlay, Popover, Panel, Modal, Grid, Row, Col} from 'react-bootstrap';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchCategoriesIfNeeded } from '../actions/categories';
import { fetchSalesmenIfNeeded } from '../actions/salesmen';
import { fetchStatusesIfNeeded } from '../actions/statuses';
import { fetchCompanies } from '../actions/companies';
import Companies from './Companies';
import CreateCompany from './CreateCompany';
import EditCompany from './EditCompany';
import Categories from './Categories';


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
        showEditCompanyModal: false,
        filter: {},
        company: ''
      }

      this.filter = _.debounce(this.filter, 300);
  	}

    componentWillMount(){
      const { dispatch } = this.props;
       dispatch(fetchCategoriesIfNeeded());
       dispatch(fetchSalesmenIfNeeded());
       dispatch(fetchStatusesIfNeeded());
       dispatch(fetchCompanies({}));
    }

    filter = (name, value) => {
      var filter = this.state.filter;
      filter[name] = value;

      const { dispatch } = this.props;
      dispatch(fetchCompanies(filter));
    };

    editCompany = (company) => {

      this.setState({showEditCompanyModal: true});
      this.setState({company: company});
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

  		return (
  			<div>

           <div style={styles.headerArea}>
              <div style={{width: 120}}>
                <Button
                  bsStyle="primary"
                  onClick={e => this.setState({showSelectCategories: !this.state.showSelectCategories})}>
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
                    <CreateCompany onCreate={this.onCreateCompany} />
                  </Modal.Body>
                </Modal>
              </div>

              <div>
                <Modal
                  show={this.state.showEditCompanyModal}
                  onHide={e => this.setState({showEditCompanyModal: false})}
                  bsSize="lg">
                  <Modal.Header closeButton>
                    <Modal.Title>Verk</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <EditCompany company={this.state.company}/>
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
                  expanded={this.state.showSelectCategories}>
                    <Categories filter={this.filter} />
                </Panel>
              </div>
           </div>

           <div style={styles.gridArea}>
              <Companies
                filter={this.filter}
                rowCount={companiesCount}
                onClick={this.editCompany} />
           </div>
        </div>
  		);
  	}
}

Main.propTypes = {
  companiesCount: PropTypes.number.isRequired,
  categories: PropTypes.array.isRequired,
  salesmen: PropTypes.array.isRequired,
  statuses: PropTypes.array.isRequired,
  loaded: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  var categories = state.categories.items;
  var companies = state.companies.items;
  var salesmen = state.salesmen.items;
  var statuses = state.statuses.items;

  let loaded = false;

  if(state.categories.loaded && state.salesmen.loaded && state.statuses.loaded) {
    loaded = true;
  }

  let companiesCount = 0;

  if(state.companies.loaded) {
    companiesCount = state.companies.items.length;
  }

  return { loaded, categories, salesmen, statuses, companiesCount}
}

export default connect(mapStateToProps)(Main);
