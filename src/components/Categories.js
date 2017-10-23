import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col, Input } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setFilter } from '../actions/companies';
import _ from 'lodash';
import jwtDecode from 'jwt-decode';

class Categories extends Component {

  constructor(props) {
     super(props);
     this.state = {
       filter: {},
       categories: [],
       showAllCategories: true,
       showNoSaleCompanies: true
     }
  }

  componentWillMount = () => {
    let categories = this.props.categories.map(category => {
        return category._id;
    });

    this.setState({categories: categories});
  };

  changeCategory = (e) => {

    var categories = this.state.categories;

    if(e.target.checked) {
      categories.push(e.target.value);
    }
    else{
      categories.splice(_.indexOf(categories, e.target.value), 1);
    }

    this.setCategories(categories);
  };

  toggleAllCategories = (e) => {

    var showAllCategories = !this.state.showAllCategories;

    this.setState({showAllCategories: showAllCategories});

    let categories = [];

    if(showAllCategories){
       categories = this.props.categories.map(category => {
        return category._id;
      });
    }

    this.setState({categories, categories});
    this.setState({showNoSaleCompanies: showAllCategories});
    this.props.updateAll(categories, showAllCategories);
  };

  setCategories = (categories) => {
    this.setState({categories, categories});
    var filter = this.state.filter;
    this.props.filter('categories', categories);
  };

  showNoSaleCompanies = () => {
    this.setShowNoSaleCompanies(!this.state.showNoSaleCompanies);
  };

  setShowNoSaleCompanies = (showNoSaleCompanies) => {
    let filter = this.state.filter;
    this.setState({showNoSaleCompanies: showNoSaleCompanies});
    this.props.filter('nosale', showNoSaleCompanies);
  };

  render() {

    let categories = this.props.categories.map(category => {
        return (
            <Col>
             <Input
              key={category.id}
              type="checkbox"
              label={category.name}
              value={category._id}
              checked={this.state.categories.indexOf(category._id) >= 0}
              onClick={e => this.changeCategory(e)}  />
           </Col>
          );
    });

    return(
      <Grid>
        <Row>
          <Col>
            <Input
              type="checkbox"
              label='Sýna allt'
              value='showall'
              checked={this.state.showAllCategories}
              onClick={e => this.toggleAllCategories(e)} />
            <Input
              type="checkbox"
              label="Án verks"
              value="nosale"
              checked={this.state.showNoSaleCompanies}
              onClick={this.showNoSaleCompanies}
              />
          </Col>
          {categories}
        </Row>
      </Grid>
    )
  }
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  let categories =  _.sortBy( state.categories.items, function(o) { return o.name; });

  
  let token = jwtDecode(sessionStorage.token);
  if(token.type === 'supervisorlimited') {
    categories = _.remove(categories, function(category) {
      return !(category.name == 'Ísland atvinnuhættir og menning');
    });
  }

  return { categories }
}

export default connect(mapStateToProps)(Categories);
