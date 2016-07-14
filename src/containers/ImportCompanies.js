import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchCategoriesIfNeeded } from '../actions/categories';
import { fetchSalesmenIfNeeded } from '../actions/salesmen';
import { fetchStatusesIfNeeded } from '../actions/statuses';
import { importCompanies } from '../actions/company';
import importCompaniesFile from 'json!../../server/cc.json';
import _ from 'lodash';


class ImportCompanies extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategoriesIfNeeded());
    dispatch(fetchSalesmenIfNeeded());
    dispatch(fetchStatusesIfNeeded());
  }

  getSales = (company) => {

    const { salesmen, categories, statuses } = this.props;

    let sm = _.find(salesmen, { 'name': company.sm });
    let sales = [];

    if(company.ACC){
      let status = _.find(statuses, { 'name': company.ACC });
      let category = _.find(categories, { 'name': "Accommodation" });
      let sale = {
        salesmanId: sm._id,
        categoryId: category._id,
        statusId: status._id
      };
      sales.push(sale);
    }

    if(company.ACT){
      let status = _.find(statuses, { 'name': company.ACT });
      let category = _.find(categories, { 'name': "Activity" });
      let sale = {
        salesmanId: sm._id,
        categoryId: category._id,
        statusId: status._id
      };
      sales.push(sale);
    }

    if(company.APP){
      let status = _.find(statuses, { 'name': company.APP });
      let category = _.find(categories, { 'name': "App" });
      let sale = {
        salesmanId: sm._id,
        categoryId: category._id,
        statusId: status._id
      };
      sales.push(sale);
    }

    if(company.DS){
      let status = _.find(statuses, { 'name': company.DS });
      let category = _.find(categories, { 'name': "Design and shopping" });
      let sale = {
        salesmanId: sm._id,
        categoryId: category._id,
        statusId: status._id
      };
      sales.push(sale);
    }

    if(company.DO){
      let status = _.find(statuses, { 'name': company.DO });
      let category = _.find(categories, { 'name': "Dining" });
      let sale = {
        salesmanId: sm._id,
        categoryId: category._id,
        statusId: status._id
      };
      sales.push(sale);
    }

    if(company.Guest){
      let status = _.find(statuses, { 'name': company.Guest });
      let category = _.find(categories, { 'name': "Guest" });
      let sale = {
        salesmanId: sm._id,
        categoryId: category._id,
        statusId: status._id
      };
      sales.push(sale);
    }

    if(company.KortDO){
      let status = _.find(statuses, { 'name': company.KortDO });
      let category = _.find(categories, { 'name': "Kort Dining" });
      let sale = {
        salesmanId: sm._id,
        categoryId: category._id,
        statusId: status._id
      };
      sales.push(sale);
    }

    if(company.KortDS){
      let status = _.find(statuses, { 'name': company.KortDS });
      let category = _.find(categories, { 'name': "Kort Shopping" });
      let sale = {
        salesmanId: sm._id,
        categoryId: category._id,
        statusId: status._id
      };
      sales.push(sale);
    }

    if(company.Island) {
      let status = _.find(statuses, { 'name': company.Island });
      let category = _.find(categories, { 'name': "Ísland atvinnuhættir og menning" });
      let sale = {
        salesmanId: sm._id,
        categoryId: category._id,
        statusId: status._id
      };
      sales.push(sale);
    }

    if(company.KortAku){
      let status = _.find(statuses, { 'name': company.KortAku });
      let category = _.find(categories, { 'name': "Kort Akureyri" });
      let sale = {
        salesmanId: sm._id,
        categoryId: category._id,
        statusId: status._id
      };
      sales.push(sale);
    }

    if(company.KortHfj) {
      let status = _.find(statuses, { 'name': company.KortHfj });
      let category = _.find(categories, { 'name': "Kort Akureyri" });
      let sale = {
        salesmanId: sm._id,
        categoryId: category._id,
        statusId: status._id
      };
      sales.push(sale);
    }

    if(company.KortRnb) {
      let status = _.find(statuses, { 'name': company.KortRnb });
      let category = _.find(categories, { 'name': "Kort Reykjavík" });
      let sale = {
        salesmanId: sm._id,
        categoryId: category._id,
        statusId: status._id
      };
      sales.push(sale);
    }

    return sales;
  };

  render() {
    const { dispatch, loaded, categories, salesmen, statuses } = this.props;

    if(!loaded) {
        return(<div>Loading</div>);
    }

    let companies = importCompaniesFile.map(company => {
      let sales = this.getSales(company);
      return(
        {
          "ssn": company.ssn,
          "name": company.name,
          "address": company.address,
          "postalCode": company.postalCode,
          "phone": company.phone,
          "email": company.email,
          "sales": sales
        }
      );
    });

    //console.log(companies);
    dispatch(importCompanies(companies));

    return (
      <div>
        Import
      </div>
    );
  }
}

function mapStateToProps(state) {
  var categories = state.categories.items;
  var salesmen = state.salesmen.items;
  var statuses = state.statuses.items;

  let loaded = false;

  if(state.categories.loaded && state.salesmen.loaded && state.statuses.loaded) {
    loaded = true;
  }

  return { loaded, categories, salesmen, statuses}
}

export default connect(mapStateToProps)(ImportCompanies);
