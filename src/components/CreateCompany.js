import React, { Component, PropTypes } from 'react';
import {Input, Button, Alert, DropDown, Col} from 'react-bootstrap';
import _ from 'lodash';
import { connect } from 'react-redux';
import ToggleDisplay from 'react-toggle-display';
import { createCompany } from '../actions/company';


class CreateCompany extends React.Component {

  constructor(props) {
     super(props);
     this.state = {
       salesman: '',
       categories: []
     }
   }

  componentWillMount(){
    const {salesmen} = this.props;
    this.setState({salesman: salesmen[0]._id});
  }

  createCompany = (e) => {

    const { dispatch } = this.props;

    dispatch(createCompany(
      this.refs.ssn.getValue(),
      this.refs.name.getValue(),
      this.refs.address.getValue(),
      this.refs.postalCode.getValue(),
      this.refs.phone.getValue(),
      this.refs.email.getValue(),
      this.refs.comment.getValue(),
      this.getSales(),
    ));
  };

  getSales = () => {
    const statusId = '56b6196af7ec61807b2fdffb';

    let sales = [];
    this.state.categories.map(function(category){
      sales.push({
        "categoryId": category.categoryId,
        "salesmanId": category.salesmanId,
        "statusId": statusId
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
      categories.splice(_.indexOf(categories, category), 1);
    }

    this.setState({categories: categories});
  };

	render() {

    let salesmen = this.props.salesmen.map(salesman => {
      return (<option value={salesman._id} key={salesman._id}>{salesman.name}</option>);
    });

    let categories = this.props.categories.map(category => {
      return (
        <Col>
             <Input
              key={category._id}
              type="checkbox"
              label={category.name}
              value={category._id}
              //checked={this.props.checked}
              //checked={this.state.categories.indexOf(category) >= 0}
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

          {categoriesBySalesman}

          <div style={{display: 'flex', flexDirection: 'row',}}>
            <Input type="select" ref="salesman" label="Sölumaður" onChange={this.changeSalesman} style={{width: 250}}>
              {salesmen}
            </Input>
          </div>

				  <div style={{display: 'flex', flexDirection: 'row',}}>
            <Input type="text" label="Nafn" placeholder="Nafn" ref="name" style={{width: 250}} />
            <Input type="text" label="Nafn samkvæmt rsk" placeholder="Rekstrarnafn" ref="namersk" style={{width: 250}} />
           </div>

           <div style={{display: 'flex', flexDirection: 'row'}}>
            <Input type="text" label="Kennitala" placeholder="Kennitala" ref="ssn" style={{width: 250}} />
            <Input type="text" label="Heimilisfang" placeholder="Heimilisfang" ref="address" style={{width: 250}} />
            <Input type="text" label="Póstnúmer" placeholder="Póstnúmer" ref="postalCode" style={{width: 120}} />
           </div>

           <div style={{display: 'flex', flexDirection: 'row'}}>
            <Input type="text" label="Sími" placeholder="Sími" ref="phone" style={{width: 250}} />
            <Input type="text" label="Netfang" placeholder="Netfang" ref="email" style={{width: 250}} />
           </div>

           <Input type="textarea" label="Athugasemd" placeholder="Athugasemd" ref="comment" />

           <Button onClick={this.createCompany} bsStyle="primary">Skrá</Button>

			</div>
		);
	}
}


CreateCompany.propTypes = {
  categories: PropTypes.array.isRequired,
  salesmen: PropTypes.array.isRequired,
  loaded: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  var categories = state.categories.items;
  var salesmen = state.salesmen.items;

  let loaded = false;

  if(state.categories.loaded && state.salesmen.loaded) {
    loaded = true;
  }

  return { categories, salesmen, loaded}
}

export default connect(mapStateToProps)(CreateCompany);
