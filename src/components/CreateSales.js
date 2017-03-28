import React, { Component, PropTypes } from 'react';
import {Table, Input, Fade, Button, Well, ButtonToolbar, Overlay, Popover, Panel, Modal,
	Grid, Row, Col, Tabs, Tab} from 'react-bootstrap';
import _ from 'lodash';
import { connect } from 'react-redux';
import { updateCompany } from '../actions/company';
import ToggleDisplay from 'react-toggle-display';
import { fetchCompanies } from '../actions/companies';
import { fetchComments } from '../actions/comments';
import { addSale, deleteSale, updateSale, fetchSales } from '../actions/sales';
import moment from 'moment';
import jwtDecode from 'jwt-decode';

class CreateSales extends React.Component {

  addSale = () => {
		if(
			this.refs.category.getValue() &&
			this.refs.salesman.getValue() &&
			this.refs.status.getValue()
		) {
	    let sale = {
	      "categoryId": this.refs.category.getValue(),
	      "salesmanId": this.refs.salesman.getValue(),
	      "statusId": this.refs.status.getValue()
	    };
	    this.props.addSale(sale);
		}
  };

  deleteSale = (e, categoryId) => {
    this.props.deleteSale(categoryId);
  };

  updateSale = (e, categoryId) => {
    this.props.updateSale(categoryId);
  };

  changeSalesman = (e, categoryId) => {
		this.props.changeSalesman(e.target.value, categoryId);
	};

	changeStatus = (e, categoryId) => {
    this.props.changeStatus(e.target.value, categoryId);
	};

  render(){

		let token = jwtDecode(sessionStorage.token);
    let supervisor = (token.type === "supervisor" || token.type === "salesman") ? true : false;

    let salesmen = this.props.salesmen.map(salesman => {
      return (<option key={salesman._id} value={salesman._id}>{salesman.name}</option>);
    });

    let filteredStatuses = this.props.statuses.map(status => {
			if(!(supervisor && status.name === "Já")) {
	      return (
	          <option key={status._id} value={status._id}>{status.name}</option>
	        );
			}
    });

		let statuses = this.props.statuses.map(status => {
	    return (
	      <option key={status._id} value={status._id}>{status.name}</option>
	    );
    });

    let filteredCategories = _.filter(this.props.categories, function(o)  {
      return _.findIndex(this.props.sales, ['categoryId', o._id]) === -1;
    }.bind(this));

    let categories = filteredCategories.map(category => {
      return (
        <option key={category._id} value={category._id}>{category.name}</option>
      )
    });

    let sales = this.props.sales.map(sale => {

			let disableYes = (
				(_.find(this.props.statuses, ['_id', sale.statusId]).name === "Já") &&
				(supervisor)
			);

			return(
				<tr>
					<td>{_.find(this.props.categories, ['_id', sale.categoryId]).name}</td>
					<td>
						<Input disabled={disableYes} type="select" onChange={e => this.changeSalesman(e, sale.categoryId)} value={sale.salesmanId} style={{width: '150px'}}>
							{salesmen}
						</Input>
					</td>
					<td>
						<Input disabled={disableYes} type="select" onChange={e => this.changeStatus(e, sale.categoryId)} value={sale.statusId} style={{width: '150px'}}>
							{(supervisor && !disableYes) ? filteredStatuses : statuses}
						</Input>
					</td>
					<td>
						<div style={disableYes ? { display: 'none'} : {display: 'flex', flexDirection: 'row'}}>
							<Button
								onClick={e => this.deleteSale(e, sale.categoryId)}
								bsStyle="primary" style={{height:'35px'}}>
								Eyða
							</Button>
						</div>
					</td>
				</tr>
			)
		});

    return (
      <Table style={{padding: '20px;'}} striped bordered>
        <thead>
					<th>
						<div style={{fontSize: '14px', paddingBottom: '10px'}}>Verk</div>
						<Input type="select" style={{width: '150px'}} ref="category" >
							<option value=''>Velja verk</option>
							{categories}
						</Input>
					</th>
          <th>
						<div style={{fontSize: '14px', paddingBottom: '10px'}}>Sölumaður</div>
            <Input type="select" style={{width: '150px'}} ref="salesman">
							<option value=''>Velja sölumann</option>
              {salesmen}
            </Input>
          </th>
          <th>
						<div style={{fontSize: '14px', paddingBottom: '10px'}}>Staða</div>
            <Input type="select" style={{width: '150px'}} ref="status">
							<option value=''>Engin staða</option>
              {filteredStatuses}
            </Input>
          </th>
          <th>
            <Button
              onClick={e => this.addSale(e)}
              bsStyle="primary" style={{height:'35px'}}>
              Bæta við verki
            </Button>
          </th>
        </thead>
        <tbody>
          {sales}
        </tbody>
      </Table>
    );
  }
}

CreateSales.propTypes = {
  categories: PropTypes.array.isRequired,
  salesmen: PropTypes.array.isRequired,
  statuses: PropTypes.array.isRequired,
  sales: PropTypes.array.isRequired
}

function mapStateToProps(state, ownProps) {
  let categories = state.categories.items;
  let salesmen = state.salesmen.items;
  let statuses = state.statuses.items;
  const sales = ownProps.sales;

  return { categories, salesmen, statuses, sales }
}

export default connect(mapStateToProps)(CreateSales);
