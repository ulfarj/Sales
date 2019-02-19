import React, { Component, PropTypes } from 'react';
import {Table, Input, Fade, Button, Well, ButtonToolbar, Overlay, Popover, Panel, Modal,
	Grid, Row, Col, Tabs, Tab} from 'react-bootstrap';
import _ from 'lodash';
import { connect } from 'react-redux';
import { updateCompany, deleteCompany } from '../actions/company';
import ToggleDisplay from 'react-toggle-display';
import { fetchCompanies } from '../actions/companies';
import { fetchComments } from '../actions/comments';
import { addSale, deleteSale, fetchSales } from '../actions/sales';
import moment from 'moment';
import Sales from './Sales';
import { addComment } from '../actions/company';
import { updateCompanyComment } from '../actions/companies';
import Contract from './Contract';
import { createContract, fetchContracts, updateContract, deleteContract } from '../actions/contract';
import Contracts from './Contracts';
import EditContract from './EditContract';
import DisplayContract from './DisplayContract';
import Groups from './Groups';
import FocusGroups from './FocusGroups';
import { setFocusGroups } from '../actions/focusGroups';

class EditCompany extends React.Component {

	constructor(props) {
		 super(props);
		 this.state = {
			 salesmanId: '',
			 statusId: '',
			 company: {},
			 contractStatus: 'init',
		 }
	 }

	componentWillMount(){
		const {dispatch, salesmen, statuses, company} = this.props;

		this.setState({company: company});

		dispatch(fetchComments(company._id));
		dispatch(fetchSales(company._id));
		dispatch(fetchContracts(company._id));
	}

	updateCompany = () => {
		const { dispatch } = this.props;

		dispatch(updateCompany(
			this.props.company._id,
			this.refs.ssn.getValue(),
			this.refs.name.getValue(),
			this.refs.address.getValue(),
			this.refs.postalCode.getValue(),
			this.refs.phone.getValue(),
			this.refs.email.getValue(),
			this.state.company.legal,
			this.state.company.dontcontact,
			this.refs.contact.getValue(),
			this.refs.namersk.getValue(),
		));

		this.props.onUpdate();
	};

	deleteCompany = () => {
		const { dispatch } = this.props;
		dispatch(deleteCompany(this.props.company._id));
		this.props.onUpdate();
	};

	onChange = (e, field) => {
		const { company } = this.state;
		company[field] = e.target.value;
		this.setState({company: company});
	};

	onClick = (e, field) => {
		const { company } = this.state;
		company[field] = (company[field] === true) ? false : true;
		this.setState({company: company});
	};

	addComment = () => {
		const {dispatch, company} = this.props;
		dispatch(addComment(company._id, this.refs.comment.getValue()));
		//dispatch(fetchComments(company._id));
		dispatch(updateCompanyComment(company._id, this.refs.comment.getValue()));
	};

	createTheContract = (contract) => {
		const { dispatch } = this.props;
		dispatch(createContract(contract));
		this.setState({contractStatus: 'init'});
	}

	cancelContract = () => {
		this.setState({contractStatus: 'init'});
		this.setState({editContract: null});
		this.setState({displayContract: null});
	}

	editContract = (contract) => {
		this.setState({editContract: contract});
		this.setState({contractStatus: 'edit'});
	}

	displayContract = (contract) => {
		this.setState({displayContract: contract});
		this.setState({contractStatus: 'display'});
	}

	onUpdateContract = (contract) => {
		const { dispatch } = this.props;
		dispatch(updateContract(contract));
		this.setState({contractStatus: 'init'});
	}

	deleteContract = (contract) => {
		const { dispatch } = this.props;
		dispatch(deleteContract(contract));
	}

	setFocusGroups = groups => {
	  const { dispatch } = this.props;
	  const { company } = this.state;
	  dispatch(setFocusGroups(company._id, groups));
	  this.props.onUpdate();
	}

	render() {
		const { company } = this.state;

		// if(!this.props.loaded) {
		// 	return (<div />);
		// }

		let sortedComments = _.sortBy( this.props.comments, function(o) { return o.created; }).reverse();
		let comments = sortedComments.map(comment => {
			return (
				<tr>
					<td>{moment(comment.created).format('DD.MM.YYYY')}</td>
					<td>{comment.comment}</td>
				</tr>
			)
		});

		if(company.comment && comments.length === 0) {
		  comments.push(
			 <tr>
			  <td />
			  <td>{company.comment}</td>
			 </tr>
		  );
		}

		return(
			<div>
				<div>
					<Tabs defaultActiveKey={this.props.activeTab}>
			    	<Tab eventKey={1} title="Fyrirtæki">

							<div style={{paddingTop: '10px'}}>
								<div style={{display: 'flex', flexDirection: 'row',}}>
									<Input type="text" label="Nafn" placeholder="Nafn" onChange={e => this.onChange(e, 'name')} value={company.name} ref="name" style={{width: 250}} />
									<Input type="text" label="Nafn samkvæmt rsk" onChange={e => this.onChange(e, 'namersk')} value={company.namersk} placeholder="Rekstrarnafn" ref="namersk" style={{width: 250}} />
								</div>

								<div style={{display: 'flex', flexDirection: 'row'}}>
									<Input type="text" label="Kennitala" enabled={false} value={company.ssn} placeholder="Kennitala" ref="ssn" style={{width: 250}} />
									<Input type="text" label="Heimilisfang" onChange={e => this.onChange(e, 'address')} value={company.address} placeholder="Heimilisfang" ref="address" style={{width: 250}} />
									<Input type="text" label="Póstnúmer" onChange={e => this.onChange(e, 'postalCode')} value={company.postalCode} placeholder="Póstnúmer" ref="postalCode" style={{width: 120}} />
								</div>

								<div style={{display: 'flex', flexDirection: 'row'}}>
									<Input type="text" label="Sími" placeholder="Sími" onChange={e => this.onChange(e, 'phone')} value={company.phone} ref="phone" style={{width: 250}} />
									<Input type="text" label="Netfang" placeholder="Netfang" onChange={e => this.onChange(e, 'email')} onChange={e => this.onChange(e, 'email')} value={company.email} ref="email" style={{width: 250}} />
									<Input type="text" label="Tengill" placeholder="Tengill" onChange={e => this.onChange(e, 'contact')} value={company.contact} ref="contact" style={{width: 250}} />
								</div>
								<div>
									<Input
										type="checkbox"
										label="Lögfræðiinnheimta"
										checked={company.legal ? true : false}
										onClick={e => this.onClick(e, 'legal')}
										ref="legal"
									/>
									<Input
										type="checkbox"
										label="Ekki hafa samband (nafnið gæti breyst)"
										checked={company.dontcontact ? true : false}
										onClick={e => this.onClick(e, 'dontcontact')}
										ref="dontcontact"
									/>
								</div>
							</div>
							<div>
								<Button
									onClick={e => this.updateCompany(e)}
									bsStyle="primary" style={{height:'35px'}}>
									Uppfæra
								</Button>
							</div>
			      </Tab>
				  <Tab eventKey={2} title="Verk">
				   {this.props.salesLoaded &&
							<div style={{paddingTop: '10px'}}>
								<Sales items={this.props.sales} company={this.props.company} />
							</div>
				   }
			      </Tab>
						<Tab eventKey={3} title="Athugasemdir">
						{this.props.commentsLoaded &&
							<div>
							<div style={{ paddingTop: 20, display: 'flex' }}>
								<Input type="text" placeholder="Athugasemd" ref="comment" style={{width: 400}} />
								<Button
									onClick={this.addComment}
									bsStyle="primary" style={{height:'35px'}}>
									Bæta við
								</Button>
							</div>
							<Table style={{padding: '20px'}}>
								<thead>
									<tr>
										<th style={{width: '50px'}}>Dagsetning</th>
										<th>Athugasemd</th>
									</tr>
								</thead>
								<tbody>
									{comments}
								</tbody>
							</Table>
							</div>
						}
						</Tab>
						<Tab eventKey={4} title="Stjórnandi">
							<div style={{paddingTop: '20px'}}>
								<Button
									onClick={e => this.deleteCompany(e)}
									bsStyle="primary" style={{height:'35px'}}>
									Eyða fyrirtæki
								</Button>
							</div>
						</Tab>
						<Tab eventKey={5} title="Samningar">
						{this.props.contractsLoaded &&
							<div>
							{((this.state.contractStatus === 'edit') && (this.state.editContract)) &&
								<EditContract
									salesmen={this.props.salesmen}
									statuses={this.props.statuses}
									categories={this.props.categories}
									groups={this.props.groups}
									companyId={company._id}
									onCancel={this.cancelContract}
									contract={this.state.editContract}
									onEdit={this.onUpdateContract}
								/>
							}

							{(this.state.contractStatus === 'create') &&
								<Contract
									salesmen={this.props.salesmen}
									statuses={this.props.statuses}
									categories={this.props.categories}
									groups={this.props.groups}
									companyId={company._id}
									onCreate={this.createTheContract}
									onCancel={this.cancelContract}
								/>
							}

							{(this.state.contractStatus === 'display') &&
								<DisplayContract
									salesmen={this.props.salesmen}
									statuses={this.props.statuses}
									categories={this.props.categories}
									groups={this.props.groups}
									companyId={company._id}
									onCancel={this.cancelContract}
									contract={this.state.displayContract}
								/>
							}

							{(this.state.contractStatus === 'init') &&
								<div>
									{this.props.contracts &&
										<Contracts
											contracts={this.props.contracts}
											salesmen={this.props.salesmen}
											statuses={this.props.statuses}
											categories={this.props.categories}
											onEdit={this.editContract}
											onDelete={this.deleteContract}
											onDisplay={this.displayContract}
										/>
									}
									<div style={{ paddingTop: 20 }}>
										<Button
											onClick={e => this.setState({contractStatus: 'create'})}
											bsStyle="primary" style={{height:'35px', marginRight: '10px'}}>
											Skrá nýjan samning
										</Button>
									</div>
								</div>
							}
						  </div>
						}
						</Tab>
						<Tab eventKey={6} title="Flokkar">
							<Groups
								company={company}
								onUpdate={this.props.onUpdate}
							/>
						</Tab>
						<Tab eventKey={7} title="Markhópar">
						  {this.props.focusGroupsLoaded &&
							<FocusGroups
								items={company.focusGroups}
								focusGroups={this.props.focusGroups}
								handleSubmit={this.setFocusGroups}
							/>
						  }
						</Tab>
					</Tabs>
				</div>
			</div>
		);
	}
}

EditCompany.propTypes = {
  categories: PropTypes.array.isRequired,
  salesmen: PropTypes.array.isRequired,
  statuses: PropTypes.array.isRequired,
  comments: PropTypes.array,
  loaded: PropTypes.bool,
	filter: PropTypes.array,
	activeTab: PropTypes.int,
	sales: PropTypes.array,
	contracts: PropTypes.array,
	groups: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  focusGroups: PropTypes.array.isRequired,
  focusGroupsLoaded: PropTypes.bool.isRequired,
}

function mapStateToProps(state, ownProps) {
  let categories = state.categories.items;
  let salesmen = state.salesmen.items;
  let statuses = state.statuses.items;

//   && state.contracts.loaded
  let loaded = state.sales.loaded && state.comments.loaded;
  let filter = state.companies.filter;
  let activeTab = ownProps.activeTab;
  let comments = [];
  let sales = [];
  let contracts = [];


  if(state.contracts && state.contracts.loaded) {
  	contracts = state.contracts.items;
  }

	if(state.comments && state.comments.loaded) {
		comments = state.comments.items;
	}

	if(state.sales && state.sales.loaded) {
		sales = state.sales.items;
	}

	const groups = state.groups.items;

  return {
		categories,
		salesmen,
		statuses,
		loaded,
		filter,
		activeTab,
		comments,
		sales,
		contracts,
		groups,
		salesLoaded: state.sales.loaded,
		commentsLoaded: state.comments.loaded,
		contractsLoaded: state.contracts.loaded,
		focusGroups: state.focusGroups.items,
		focusGroupsLoaded: state.focusGroups.loaded,
	}
}

export default connect(mapStateToProps)(EditCompany);
