import React, { Component, PropTypes } from 'react';
import { Input, Button, Alert, DropDown, Col, Modal } from 'react-bootstrap';
import _ from 'lodash';
import { connect } from 'react-redux';
import ToggleDisplay from 'react-toggle-display';
import { createCompany, findCompany } from '../actions/company';
import webconfig from 'config';
import Confirm from 'react-bootstrap-confirm'


class CreateCompany extends React.Component {

  constructor(props) {
     super(props);
     this.state = {
       salesman: '',
       categories: [],
       ssnerror: false,
       showCompanyExistsModal: false,
     }
   }

  componentWillMount(){
    const {salesmen} = this.props;
    this.setState({salesman: salesmen[0]._id});
  }

  validateUserId = (userId) => {

    var valid = false;
    var digitRegex = new RegExp(/^\d+$/);
    if(userId.length === 10 && digitRegex.test(userId)){

      valid = true;
      //let first = parseInt(userId.charAt(0)) - 4;
      //userId = first.toString() + userId.substring(1,10);

      /*
    	if((parseInt(userId.charAt(9)) === 8 || parseInt(userId.charAt(9)) === 9 || parseInt(userId.charAt(9)) === 0)) {
    		var total =
    		(parseInt(userId.charAt(0)) * 3) +
    		(parseInt(userId.charAt(1)) * 2) +
    		(parseInt(userId.charAt(2)) * 7) +
    		(parseInt(userId.charAt(3)) * 6) +
    		(parseInt(userId.charAt(4)) * 5) +
    		(parseInt(userId.charAt(5)) * 4) +
    		(parseInt(userId.charAt(6)) * 3) +
    		(parseInt(userId.charAt(7)) * 2);

    		var checkDigit = 11 - (total % 11);

    		if(parseInt(userId.charAt(8)) === checkDigit) {
    			valid = true;
    		}
      }*/
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
      this.getSales(),
      this.refs.namersk.getValue(),
      this.refs.contact.getValue(),
    ));
    this.props.onCreate();
  }

  confirm = (userId) => {
    const { ssn, loaded, company } = this.props;

    setTimeout(function() {
      if(ssn && loaded) {
        if(ssn === userId && company.length > 0) {
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

  getSales = () => {

    let sales = [];
    this.state.categories.map(function(category){
      sales.push({
        "categoryId": category.categoryId,
        "salesmanId": category.salesmanId,
        "statusId": webconfig.statusId
      });
    }.bind(this));

    return sales;
  };

  changeSalesman = (e) => {
    this.setState({salesman: e.target.value});
  };

  changeCategory = (e) => {

    var categories = this.state.categories;

    var category = {
      'categoryId': e.target.value,
      'salesmanId': this.state.salesman,
    };

    if(e.target.checked) {
      categories.push(category);
    }
    else{
      var index = _.findIndex(categories, ['categoryId', e.target.value]);
      categories.splice(index, 1);
    }

    this.setState({categories: categories});
  };

  isChecked = (category) => {
    return _.findIndex(this.state.categories, ['categoryId', category._id]) > - 1 ? true : false;
  };

  isDisabled = (category) => {
    var category = _.find(this.state.categories, { 'categoryId': category._id });
    return (category.salesmanId === this.props.salesman);
  };

	render() {

    let salesmen = this.props.salesmen.map(salesman => {
      return (<option value={salesman._id} key={salesman._id}>{salesman.name}</option>);
    });

    let salesman = this.state.salesman;

    let categories = this.props.categories.map(category => {

      let index = _.findIndex(this.state.categories, ['categoryId', category._id]);
      let checked = (index > -1) ? true : false;

      let disabled = checked ? (this.state.categories[index].salesmanId !== salesman) : false;

      return (
        <Col>
          <Input
            key={category._id}
            type="checkbox"
            label={category.name}
            value={category._id}
            checked={checked}
            disabled={disabled}
            onClick={this.changeCategory}  />
        </Col>
      );
    });

    let categoriesBySalesman = this.props.salesmen.map(salesman => {
      return(
          <ToggleDisplay show={this.state.salesman === salesman._id} key={salesman._id}>
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
              { categories }
            </div>
          </ToggleDisplay>
        );
    });

		return(
			<div>

        <div style={{display: 'flex', flexDirection: 'row',}}>
          <Input type="select" ref="salesman" label="Sölumaður" onChange={this.changeSalesman} style={{width: 250}}>
            {salesmen}
          </Input>
        </div>

        {categoriesBySalesman}

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

        <Button onClick={this.createCompany} bsStyle="primary">Skrá</Button>

        <Modal
          show={this.state.showCompanyExistsModal}
          onHide={e => this.setState({showCompanyExistsModal: false})}
          bsSize="lg">
          <Modal.Header closeButton>
            <Modal.Title>Kennitala er þegar skráð</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Ertu viss um að þú viljir skrá þessa færslu
            <div style={{display: 'flex', paddingTop: 20}}>
              <div>
                <Button onClick={this.onCreate} bsStyle="primary">Já</Button>
              </div>
              <div style={{paddingLeft: 15}}>
                <Button onClick={e => this.setState({showCompanyExistsModal: false})} bsStyle="secondary">Nei</Button>
              </div>
            </div>
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
}

function mapStateToProps(state) {
  var categories = state.categories.items;
  var salesmen = state.salesmen.items;
  const companies = state.companies.items;
  const ssn = state.company.ssn;
  const company = state.company.company;

  let loaded = false;

  if(state.categories.loaded && state.salesmen.loaded) {
    loaded = true;
  }

  return { categories, salesmen, loaded, companies, ssn, company }
}

export default connect(mapStateToProps)(CreateCompany);
