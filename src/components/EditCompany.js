import React, { Component, PropTypes } from 'react';
import {Table, Input, Fade, Button, Well, ButtonToolbar, Overlay, Popover, Panel, Modal,
	Grid, Row, Col, Tabs, Tab} from 'react-bootstrap';
import _ from 'lodash';
import { connect } from 'react-redux';
import { updateCompany } from '../actions/company';
import ToggleDisplay from 'react-toggle-display';
import { fetchCompanies } from '../actions/companies';

class EditCompany extends React.Component {

	constructor(props) {
		 super(props);
		 this.state = {
			 salesmanId: '',
			 statusId: '',
			 sales: [],
			 company: {},
		 }
	 }

	componentWillMount(){
		const {salesmen, statuses, company} = this.props;

		var status = _.find(statuses, { 'name': 'Enginn staða' });

		this.setState({sales: company.sales});
		this.setState({statusId: status._id});
		this.setState({salesmanId: salesmen[0]._id});
		this.setState({company: company});
	}

	update() {
		const { dispatch, companyId } = this.props;

		dispatch(updateCompany(
			this.props.company._id,
			this.refs.ssn.getValue(),
      this.refs.name.getValue(),
      this.refs.address.getValue(),
      this.refs.postalCode.getValue(),
      this.refs.phone.getValue(),
      this.refs.email.getValue(),
      '',
			this.state.sales
		))

		this.props.onUpdate();
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

	changeSalesman = (e, categoryId) => {
		let index = _.findIndex(this.state.sales, ['categoryId', categoryId]);
		let sales = this.state.sales;

		sales[index].salesmanId = e.target.value;

		this.setState({sales: sales});
	};

	changeStatus = (e, categoryId) => {
		let index = _.findIndex(this.state.sales, ['categoryId', categoryId]);
		let sales = this.state.sales;

		sales[index].statusId = e.target.value;

		this.setState({sales: sales});
	};

	onChange = (e, field) => {
		const { company } = this.state;
		company[field] = e.target.value;

		this.setState({company: company});
	};

	render() {

		const { companyId } = this.props;
		const { company } = this.state;

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
					<Tabs defaultActiveKey={this.props.activeTab}>
			    	<Tab eventKey={1} title="Fyrirtæki">

							<div style={{paddingTop: '10px'}}>
								<div style={{display: 'flex', flexDirection: 'row',}}>
									<Input type="text" label="Nafn" placeholder="Nafn" onChange={e => this.onChange(e, 'name')} value={company.name} ref="name" style={{width: 250}} />
									<Input type="text" label="Nafn samkvæmt rsk" placeholder="Rekstrarnafn" ref="namersk" style={{width: 250}} />
								</div>

								<div style={{display: 'flex', flexDirection: 'row'}}>
									<Input type="text" label="Kennitala" onChange={e => this.onChange(e, 'ssn')} value={company.ssn} placeholder="Kennitala" ref="ssn" style={{width: 250}} />
									<Input type="text" label="Heimilisfang" onChange={e => this.onChange(e, 'address')} value={company.address} placeholder="Heimilisfang" ref="address" style={{width: 250}} />
									<Input type="text" label="Póstnúmer" onChange={e => this.onChange(e, 'postalCode')} value={company.postalCode} placeholder="Póstnúmer" ref="postalCode" style={{width: 120}} />
								</div>

								<div style={{display: 'flex', flexDirection: 'row'}}>
									<Input type="text" label="Sími" placeholder="Sími" onChange={e => this.onChange(e, 'phone')} value={company.phone} ref="phone" style={{width: 250}} />
									<Input type="text" label="Netfang" placeholder="Netfang" onChange={e => this.onChange(e, 'email')} onChange={e => this.onChange(e, 'email')} value={company.email} ref="email" style={{width: 250}} />
									<Input type="text" label="Tengill" placeholder="Tengill" onChange={e => this.onChange(e, 'link')} ref="link" style={{width: 250}} />
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
	loaded: PropTypes.bool,
	filter: PropTypes.array,
	activeTab: PropTypes.int,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  let categories = state.categories.items;
  let salesmen = state.salesmen.items;
  let statuses = state.statuses.items;
	let loaded = state.company.loaded;
	let filter = state.companies.filter;
	let activeTab = ownProps.activeTab;

  return { categories, salesmen, statuses, loaded, filter, activeTab }
}

export default connect(mapStateToProps)(EditCompany);
