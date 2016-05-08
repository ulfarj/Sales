import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col, Input } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setFilter } from '../actions/companies';

class Categories extends Component {

  constructor(props) {
     super(props);
     this.state = {
       filter: {},
       categories: [],
       showAllCategories: true
     }
  }

  componentWillMount = () => {
    let categories = this.props.categories.map(category => {
        return category._id;
    });

    //const {dispatch} = this.props;
    //var filter = {};
    //filter['categories'] = categories;
    //dispatch(setFilter(filter));

    this.setState({categories: categories});
    this.props.filter('categories', categories);
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

    this.setCategories(categories);
  };

  setCategories = (categories) => {

    this.setState({categories, categories});
    var filter = this.state.filter;
    this.props.filter('categories', categories);
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
              label='Sýna alla flokka'
              value='showall'
              checked={this.state.showAllCategories}
              onClick={e => this.toggleAllCategories(e)} />
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
  var categories = state.categories.items;

  return { categories }
}

export default connect(mapStateToProps)(Categories);
