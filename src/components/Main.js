import React, { Component, PropTypes } from 'react';
import ReactDOM from "react-dom";
import {Table, Input, Fade, Button, Well, ButtonToolbar, Overlay, Popover, Panel, Modal, Grid, Row, Col, Glyphicon} from 'react-bootstrap';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchCategoriesIfNeeded } from '../actions/categories';
import { fetchSalesmenIfNeeded } from '../actions/salesmen';
import { fetchStatusesIfNeeded } from '../actions/statuses';
import { fetchCompanies } from '../actions/companies';
import { logoutUser } from '../actions/account';
import Companies from './Companies';
import CreateCompany from './CreateCompany';
import EditCompany from './EditCompany';
import Categories from './Categories';
import injectTapEventPlugin from 'react-tap-event-plugin';

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
        company: '',
        editTab: 2
      }

      this.filter = _.debounce(this.filter, 300);
  	}

    componentWillMount(){
      injectTapEventPlugin();
      const { dispatch } = this.props;
      dispatch(fetchCategoriesIfNeeded());
      dispatch(fetchSalesmenIfNeeded());
      dispatch(fetchStatusesIfNeeded());
    }

    componentDidMount(){
    }

    updateAllCategories = (categories, nosale) => {
      let filter = this.props.filter;
      filter['categories'] = categories;
      filter['nosale'] = nosale;

      const { dispatch } = this.props;
      dispatch(fetchCompanies(filter));
    };

    filter = (name, value) => {
      var filter = this.props.filter;
      filter[name] = value;

      const { dispatch } = this.props;
      dispatch(fetchCompanies(filter));
    };

    editCompany = (company, activeTab) => {
      this.setState({showEditCompanyModal: true});
      this.setState({company: company});
      this.setState({editTab: activeTab});
    };

    onCreateCompany = () => {
      this.setState({showCreateCompanyModal: false});
    };

    onUpdateCompany = () => {
      this.setState({showEditCompanyModal: false});
    };

    logoutUser = () => {
      const { dispatch } = this.props;
      dispatch(logoutUser());
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
                Velja verk
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
                  <EditCompany activeTab={this.state.editTab} company={this.state.company} onUpdate={this.onUpdateCompany}/>
                </Modal.Body>
              </Modal>
            </div>
            {/* Login
              <div style={{paddingLeft: '40'}}>
              <Button
              bsStyle="primary"
              onClick={e => this.logoutUser()}
              >
              Útskrá
              </Button>
            </div>*/}

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
                <Categories filter={this.filter} updateAll={this.updateAllCategories}/>
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
  categories: PropTypes.array,
  salesmen: PropTypes.array,
  statuses: PropTypes.array,
  loaded: PropTypes.bool.isRequired,
  filter: PropTypes.object,
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

  let companiesCount = state.companies.loaded ? state.companies.items.length : 0;
  let filter = state.companies ? state.companies.filter : {};

  return { loaded, categories, salesmen, statuses, companiesCount, filter}
}

export default connect(mapStateToProps)(Main);
