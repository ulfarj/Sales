import React, { Component, PropTypes } from 'react';
import {Table, Input, Fade, Button, Well, ButtonToolbar, Overlay, Popover, Panel, Modal,
	Grid, Row, Col, Tabs, Tab} from 'react-bootstrap';
import ToggleDisplay from 'react-toggle-display';
import _ from 'lodash';
import { connect } from 'react-redux';

class General extends React.Component {

	constructor(props) {
		 super(props);
		 this.state = {
			 salesmanId: '',
       statusId: '',
       sales: []
		 }
	 }

	componentWillMount(){
    const {salesmen, statuses, company} = this.props;

    var statusId = _.find(statuses, { 'name': 'Engin staða' });

    this.setState({sales: company.sales});
    this.setState({statusId: statusId});
    this.setState({salesmanId: salesmen[0]._id});
	}

	update() {
	};

  changeCategory = (e) => {

    var sales = this.state.sales;
    var sale = {
      'statusId': this.state.statusId,
      'categoryId': e.target.value,
      'salesmanId': this.state.salesmanId,
    };

    if(e.target.checked) {
      sales.push(sale);
    }
    else{
			var index = _.findIndex(sales, ['categoryId', sale.categoryId]);
      sales.splice(index, 1);
    }

    this.setState({sales: sales});
  };

	changeSalesman = (e) => {
		this.setState({salesmanId: e.target.value});
	};

	render() {

		const { companyId, company } = this.props;

		let salesmen = this.props.salesmen.map(salesman => {
			return (<option value={salesman._id} key={salesman._id}>{salesman.name}</option>);
		});

    let categories = this.props.categories.map(category => {

      let index = _.findIndex(this.state.sales, ['categoryId', category._id]);
      let checked = (index > -1) ? true : false;
      let disabled = checked ? (this.state.sales[index].salesmanId !== this.state.salesmanId) : false;

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
          <ToggleDisplay show={this.state.salesmanId === salesman._id} key={salesman._id}>
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
              { categories }
            </div>
          </ToggleDisplay>
        );
    });

		return(
	          <div style={{paddingTop: '15px'}}>

              <div>
                {categoriesBySalesman}
              </div>

							<div style={{display: 'flex', flexDirection: 'row',}}>
		            <Input type="select" ref="salesman" label="Sölumaður" onChange={this.changeSalesman} style={{width: 250}}>
		              {salesmen}
		            </Input>
		          </div>

	            <div style={{paddingTop: '10px'}}>
	              <div style={{display: 'flex', flexDirection: 'row',}}>
	                <Input type="text" label="Nafn" placeholder="Nafn" value={company.name} ref="name" style={{width: 250}} />
	                <Input type="text" label="Nafn samkvæmt rsk" placeholder="Rekstrarnafn" ref="namersk" style={{width: 250}} />
	              </div>

	              <div style={{display: 'flex', flexDirection: 'row'}}>
	                <Input type="text" label="Kennitala" value={company.ssn} placeholder="Kennitala" ref="ssn" style={{width: 250}} />
	                <Input type="text" label="Heimilisfang" value={company.address} placeholder="Heimilisfang" ref="address" style={{width: 250}} />
	                <Input type="text" label="Póstnúmer" value={company.postalCode} placeholder="Póstnúmer" ref="postalCode" style={{width: 120}} />
	              </div>

	              <div style={{display: 'flex', flexDirection: 'row'}}>
	                <Input type="text" label="Sími" placeholder="Sími" value={company.phone} ref="phone" style={{width: 250}} />
	                <Input type="text" label="Netfang" placeholder="Netfang" value={company.email} ref="email" style={{width: 250}} />
	                <Input type="text" label="Tengill" placeholder="Tengill" ref="link" style={{width: 250}} />
	              </div>
	            </div>
	          </div>

		);
	}
}

General.propTypes = {
  categories: PropTypes.array.isRequired,
  salesmen: PropTypes.array.isRequired,
  statuses: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  var categories = state.categories.items;
  var salesmen = state.salesmen.items;
  var statuses = state.statuses.items;

  return { categories, salesmen, statuses}
}

export default connect(mapStateToProps)(General);
