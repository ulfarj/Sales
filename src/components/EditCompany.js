import React, { Component, PropTypes } from 'react';
import {Table, Input, Fade, Button, Well, ButtonToolbar, Overlay, Popover, Panel, Modal,
	Grid, Row, Col, Tabs, Tab} from 'react-bootstrap';
import _ from 'lodash';
import { connect } from 'react-redux';
import ToggleDisplay from 'react-toggle-display';

class EditCompany extends React.Component {

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

		var status = _.find(statuses, { 'name': 'Enginn staða' });

		this.setState({sales: company.sales});
		this.setState({statusId: status._id});
		this.setState({salesmanId: salesmen[0]._id});
	}

	update() {
	};

	changeCategory = (e) => {

		var sales = this.state.sales;
		/*
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
		}*/

		this.setState({sales: sales});
	};

	changeSalesman = (e, categoryId) => {
		let index = _.findIndex(this.state.sales, ['categoryId', category._id]);
		let sales = this.state.sales;

		sales[index].salesmanId = e.target.value;

		this.setState({sales: sales});
	};

	changeStatus = (e, categoryId) => {
		let index = _.findIndex(this.state.sales, ['categoryId', category._id]);
		let sales = this.state.sales;

		sales[index].statusId = e.target.value;

		this.setState({sales: sales});
	};


	render() {

		const { companyId, company } = this.props;

		let salesmen = this.props.salesmen.map(salesman => {
			return (<option key={salesman._id} value={salesman._id}>{salesman.name}</option>);
		});

		let statuses = this.props.statuses.map(status => {
			return (
					<option key={status._id} value={status._id}>{status.name}</option>
				);
		});

    let categories = this.props.categories.map(category => {

      let index = _.findIndex(this.state.sales, ['categoryId', category._id]);
      let checked = (index > -1) ? true : false;

			let statusId = checked ? this.state.sales[index].statusId : this.state.statusId;
			let salesmanId = checked ? this.state.sales[index].salesmanId : this.state.salesmanId;

      return (
        <tr>
					<td>
             <Input
              key={category._id}
              type="checkbox"
              label={category.name}
              value={category._id}
              checked={checked}
              onClick={this.changeCategory}  />
					</td>
					<td>
						<Input type="select" onChange={e => this.changeStatus(e, category._id)} value={statusId} disabled={!checked} style={{width: '150px'}}>
							{statuses}
						</Input>
					</td>
					<td>
						<Input type="select"  onChange={e => this.changeSalesman(e, category._id)} disabled={!checked} value={salesmanId} style={{width: 250}}>
							{salesmen}
						</Input>
					</td>
        </tr>
      );
    });

		return(
			<div>
				<div>
					<Tabs defaultActiveKey={1}>
			    	<Tab eventKey={1} title="Fyrirtæki">

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

			      </Tab>
			      <Tab eventKey={2} title="Verk">
							<div style={{paddingTop: '10px'}}>
								<table>
									{categories}
								</table>
							</div>
			      </Tab>

		  		</Tabs>
				</div>
				<div>
					<Button
						onClick={e => this.update(e)}
						bsStyle="primary" style={{height:'35px'}}>
						Uppfæra
					</Button>
				</div>
			</div>

		);
	}
}

EditCompany.propTypes = {
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

export default connect(mapStateToProps)(EditCompany);
