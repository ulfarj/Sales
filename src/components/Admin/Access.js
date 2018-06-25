import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Input } from 'react-bootstrap';
import Filter from './Access/Filter';


class Access extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    filter = (user, name, value) => {
        const current = this.state[user._id];
        // current[name] = value;
        // console.log({ ...current, [name]: value });
        // console.log(current);
        // current = { ...curent, [name]: value };
        this.setState({[user._id]: { ...current, [name]: value }});
        // this.setState({[user._id]: {[name]: value }});
    };


    update = () => {
        console.log(this.state);
    }

    render(){
        const users = this.props.users.map(user => (
          <tr>
            <td>{user.username}</td>
            <td>
               <Filter
                 user={user}
                 items={this.props.categories}
                 type="categories"
                 filter={this.filter}
               />
            </td>
            <td>
               <Filter
                 user={user}
                 items={this.props.statuses}
                 type="statuses"
                 filter={this.filter}
               />
            </td>
            <td>
               <Filter
                 user={user}
                 items={this.props.salesmen}
                 type="salesmen"
                 filter={this.filter}
               />
            </td>
          </tr>
        ));

        return (
           <Table>
            <thead>
              <tr style={{fontWeight: 'bold'}}>
                <td>Notendanafn</td>
                <td>Verk</td>
                <td>Stöður</td>
                <td>Sölumenn</td>
              </tr>
            </thead>
              <tbody>
                {users}
                <tr>
                   <td>
                     <Button
                       onClick={this.update}
                       bsStyle="primary" style={{height:'35px'}}>
                       Uppfæra
                     </Button>
                   </td>
                </tr>
              </tbody>
           </Table>
        );
    }
}

function mapStateToProps(state) {
   const users = state.users.items;
   const categories = state.categories.items;
   const statuses = state.statuses.items;
   const salesmen = state.salesmen.items;

   return {
     users,
     categories,
     statuses,
     salesmen,
   };
}

export default connect(mapStateToProps)(Access);
