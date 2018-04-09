import React, { Component, PropTypes } from 'react';
import { Input, Button, Alert, DropDown, Col, Modal } from 'react-bootstrap';
import _ from 'lodash';
import { connect } from 'react-redux';
import ToggleDisplay from 'react-toggle-display';
import { createCompany, findCompany, initCompany } from '../actions/company';
import webconfig from 'config';
import CreateSales from './CreateSales';
import update from 'react-addons-update';
import jwtDecode from 'jwt-decode';

class CreateCompany extends React.Component {

  constructor(props) {
     super(props);
     this.state = {
       salesman: '',
       categories: [],
       ssnerror: false,
       showCompanyExistsModal: false,
       sales: [],
     }
   }

  componentWillMount(){
    const { salesmen, dispatch } = this.props;
    this.setState({salesman: salesmen[0]._id});
    dispatch(initCompany());
  }

  validateUserId = (userId) => {
    var valid = false;
    var digitRegex = new RegExp(/^\d+$/);
    if(userId.length === 10 && digitRegex.test(userId)){
      valid = true;
    }
    return valid;
  }

  onCreate = () => {
    const { dispatch } = this.props;

    let userId = this.refs.ssn.getValue();
    if(userId.indexOf('-') > '-1'){
      userId = userId.replace('-','');
    }

    dispatch(createCompany(
      userId,
      this.refs.name.getValue(),
      this.refs.address.getValue(),
      this.refs.postalCode.getValue(),
      this.refs.phone.getValue(),
      this.refs.email.getValue(),
      this.refs.comment.getValue(),
      this.state.sales,
      this.refs.namersk.getValue(),
      this.refs.contact.getValue(),
    ));
    this.props.onCreate();
  }

  confirm = (userId) => {
    const { ssn, loaded, company, companyLoaded, dispatch } = this.props;
    setTimeout(function() {
      if(ssn && loaded && companyLoaded && company) {
        console.log(company);
        console.log({ ssn });
        console.log({ userId });
        if(ssn === userId && company.length > 0) {
          dispatch(initCompany());
          this.setState({showCompanyExistsModal: true});
        } else {
          this.onCreate();
        }
      } else {
        this.confirm(userId);
      }
    }.bind(this), 200);
  }

  createCompany = (e) => {
    const { dispatch } = this.props;

    let userId = this.refs.ssn.getValue();
    if(userId.indexOf('-') > '-1'){
    	userId = userId.replace('-','');
    }

    if(this.validateUserId(userId)){
      dispatch(findCompany(userId));
      this.confirm(userId)
    }
    else {
      this.setState({ssnerror: true});
    }

  };

  checkError = () => {
    this.setState({ssnerror: this.refs.ssn.getValue().length === 0});
  };

  addSale = (sale) => {
    const sales = update(this.state.sales, {$push: [sale]});
    this.setState({sales});
  }

  updateSale = (categoryId) => {
    let index = _.findIndex(this.state.sales, ['categoryId', categoryId]);
  }

  deleteSale = (categoryId) => {
    let index = _.findIndex(this.state.sales, ['categoryId', categoryId]);
    const sales = update(this.state.sales, {$splice: [[index, 1]]})
    this.setState({sales});
  }

  changeStatus = (value, categoryId) => {
    let index = _.findIndex(this.state.sales, ['categoryId', categoryId]);
    const sales = update(this.state.sales, {[index]: {statusId: {$set: value}}});
		this.setState({sales});
  }

  changeSalesman = (value, categoryId) => {
    let index = _.findIndex(this.state.sales, ['categoryId', categoryId]);
    const sales = update(this.state.sales, {[index]: {salesmanId: {$set: value}}});
		this.setState({sales});
  }

	render() {

    const token = jwtDecode(sessionStorage.token);
    const supervisor = (token.type === "supervisor" || token.type === "admin");

    let modalBody = supervisor ? (
      <div>
        Ertu viss um að þú viljir skrá þessa færslu
        <div style={{display: 'flex', paddingTop: 20}}>
          <div>
            <Button onClick={this.onCreate} bsStyle="primary">Já</Button>
          </div>
          <div style={{paddingLeft: 15}}>
            <Button onClick={e => this.setState({showCompanyExistsModal: false})} bsStyle="secondary">Nei</Button>
          </div>
        </div>
      </div>
    ) : (
      <div style={{paddingTop: 20}}>
        <Button onClick={e => this.setState({showCompanyExistsModal: false})} bsStyle="primary">Loka glugga</Button>
      </div>
    )

		return(
			<div>
        <div style={{display: 'flex', flexDirection: 'row',}}>
          <Input type="text" label="Nafn" placeholder="Nafn" ref="name" style={{width: 250}} />
          <Input type="text" label="Nafn samkvæmt rsk" placeholder="Rekstrarnafn" ref="namersk" style={{width: 250}} />
        </div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <Input type="text" label="Kennitala" placeholder="Kennitala" ref="ssn" onChange={this.checkError} bsStyle={this.state.ssnerror ? 'error' : ''} style={{width: 250}} />
          <Input type="text" label="Heimilisfang" placeholder="Heimilisfang" ref="address" style={{width: 250}} />
          <Input type="text" label="Póstnúmer" placeholder="Póstnúmer" ref="postalCode" style={{width: 120}} />
        </div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <Input type="text" label="Sími" placeholder="Sími" ref="phone" style={{width: 250}} />
          <Input type="text" label="Netfang" placeholder="Netfang" ref="email" style={{width: 250}} />
          <Input type="text" label="Tengill" placeholder="Tengill" ref="contact" style={{width: 250}} />
        </div>

        <Input type="textarea" label="Athugasemd" placeholder="Athugasemd" ref="comment" />

        <CreateSales
          addSale={this.addSale}
          updateSale={this.updateSale}
          deleteSale={this.deleteSale}
          sales={this.state.sales}
          changeStatus={this.changeStatus}
          changeSalesman={this.changeSalesman}
        />

        <Button onClick={this.createCompany} bsStyle="primary">Skrá</Button>

        <Modal
          show={this.state.showCompanyExistsModal}
          onHide={e => this.setState({showCompanyExistsModal: false})}
          bsSize="lg">
          <Modal.Header closeButton>
            <Modal.Title>Kennitala er þegar skráð</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modalBody}
          </Modal.Body>
        </Modal>
			</div>
		);
	}
}


CreateCompany.propTypes = {
  categories: PropTypes.array.isRequired,
  salesmen: PropTypes.array.isRequired,
  loaded: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  companies: PropTypes.array.isRequired,
  ssn: PropTypes.string,
  company: PropTypes.array,
  companyLoaded: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
  var categories = state.categories.items;
  var salesmen = state.salesmen.items;
  const companies = state.companies.items;
  const ssn = state.company.ssn;
  const company = state.company.company;
  const companyLoaded = state.company.companyLoaded;

  console.log({ssn});

  let loaded = false;

  if(state.categories.loaded && state.salesmen.loaded) {
    loaded = true;
  }

  return { categories, salesmen, loaded, companies, ssn, company, companyLoaded }
}

export default connect(mapStateToProps)(CreateCompany);
