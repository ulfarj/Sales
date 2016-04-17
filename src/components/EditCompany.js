import React, { Component, PropTypes } from 'react';
import {Table, Input, Fade, Button, Well, ButtonToolbar, Overlay, Popover, Panel, Modal,
	Grid, Row, Col, Tabs, Tab} from 'react-bootstrap';
import _ from 'lodash';
import { connect } from 'react-redux';

class EditCompany extends React.Component {

	componentWillMount(){
		/*const { relay, companyId, store } = this.props;
	  relay.setVariables({sales: store.companyConnection.edges[0].node.sales});*/
	}

	createSale() {
 /*
		const { relay, companyId } = this.props;

		var onSuccess = (response) => {
		  //relay.setVariables({sales: store.saleConnection.edges});
	      console.log('Mutation sales successful!');
	    };

	    var onFailure = (transaction) => {
	      console.log(transaction.getError());
	    };

	    Relay.Store.commitUpdate(
	      new UpdateSalesMutation({
	        companyId: companyId,
	        sales: []
	      }), {onSuccess, onFailure}
	    );*/
	};

	render() {

		const { companyId } = this.props;

	    let categories = this.props.categories.map(category => {
	    	return (
	        	<option key={category._id} value={category._id}>{category.name}</option>
	         );
	    });

	    let salesmen = this.props.salesmen.map(salesman => {
	      return (
	      		<option key={salesman._id} value={salesman._id}>{salesman.name}</option>
	      	);
	    });

	    let statuses = this.props.statuses.map(status => {
	      return (
	      		<option key={status._id} value={status._id}>{status.name}</option>
	      	);
	    });

			console.log('this.props.company');
			console.log(this.props.company);

	    let sales = this.props.company.sales.map(sale => {
	    	return (
	    		<div style={{display: 'flex', flexDirection: 'row', paddingTop: '10px'}}>
	          		<Input type="select" value={sale.salesmanId}>
			      		{salesmen}
			      	</Input>
		          	<Input type="select" value={sale.categoryId}>
			      		{categories}
			      	</Input>
			      	<Input type="select" value={sale.statusId}>
			      		{statuses}
			      	</Input>
		      	</div>
	    		);
	    });

		return(
			<Tabs defaultActiveKey={1}>
	          <Tab eventKey={1} title="Fyrirtæki">
	            <div style={{paddingTop: '10px'}}>
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
	                <Input type="text" label="Tengill" placeholder="Tengill" ref="link" style={{width: 250}} />
	              </div>
	            </div>
	          </Tab>
	          <Tab eventKey={2} title="Verk">
	          	<div style={{display: 'flex', flexDirection: 'row', paddingTop: '10px'}}>
	          		<Input type="select" label="Sölumaður" ref="salesman">
			      		{salesmen}
			      	</Input>
		          	<Input type="select" label="Flokkur" ref="category">
			      		{categories}
			      	</Input>
			      	<Input type="select" label="Staða" ref="status">
			      		{statuses}
			      	</Input>

			      	<div style={{paddingTop: '22px'}}>
				      	<Button
		              onClick={e => this.createSale(e)}
		              bsStyle="primary" style={{height:'35px'}}>
		              Skrá sölu
		            </Button>
	            </div>
		      	</div>

		      	<div>
			    		{sales}
			    	</div>

	          </Tab>
	          <Tab eventKey={3} title="Samningur">
	            <div style={{paddingTop: '10px'}}>
	               <div style={{display: 'flex', flexDirection: 'row',}}>
	                    <Input type="select" ref="salesman" label="Sölumaður" onChange={this.changeSalesman} style={{width: 280}}>

	                    </Input>
	                    <Input type="text" label="Söludagur" placeholder="Söludagur" ref="dateofsale" style={{width: 140}} />

	                    <Input type="select" ref="otimabundinn" label="Ótímabundinn" style={{width: 260}}>
	                       <option value="timabundinn">Tímabundinn samningur</option>
	                       <option value="otimabundinn">Ótímabundinn samningur</option>
	                    </Input>

	                    <Input type="text" label="Samningur" placeholder="Samningur" ref="samningur" style={{width: 120}} />

	                </div>
	                <div style={{display: 'flex', flexDirection: 'row',}}>
	                  <Input type="text" label="Heildar-upphæð samnings m.v. 12 mán" placeholder="Heildar-upphæð samnings m.v. 12 mán" ref="totalamount" style={{width: 280}} />
	                  <Input type="text" label="Upphæð áskriftar" placeholder="Upphæð áskriftar" ref="descriptionamount" style={{width: 140}} />

	                  <Input type="text" label="Fyrsti gjalddagi" placeholder="Fyrsti gjalddagi" ref="dateofsale" style={{width: 140}} />
	                  <Input type="text" label="Fyrsta birting" placeholder="Fyrsta birting" ref="dateofsale" style={{width: 140}} />
	                  <Input type="text" label="Uppsögn" placeholder="Uppsögn" ref="dateofsale" style={{width: 140}} />

	                </div>

	                <div style={{display: 'flex', flexDirection: 'row',}}>
	                  <Input type="text" label="Síðasti gjalddagi" placeholder="Síðasti gjalddagi" ref="dateofsale" style={{width: 140}} />
	                  <Input type="text" label="Síðasta birting" placeholder="Síðasta birting" ref="dateofsale" style={{width: 140}} />

	                  <Input type="text" label="Grein" placeholder="Grein" ref="dateofsale" style={{width: 140}} />
	                  <Input type="text" label="Auglýsing" placeholder="Auglýsing" ref="dateofsale" style={{width: 140}} />

	                  <Input type="text" label="Umfjöllun/mynd" placeholder="Umfjöllun/mynd" ref="dateofsale" style={{width: 140}} />
	                </div>

	                <div style={{display: 'flex', flexDirection: 'row',}}>
	                <Input type="text" label="E-mail" placeholder="E-mail" ref="dateofsale" style={{width: 140}} />
	                <Input type="text" label="Efni komið" placeholder="Efni komið" ref="dateofsale" style={{width: 140}} />
	                <Input type="text" label="Próförk" placeholder="Próförk" ref="dateofsale" style={{width: 140}} />
	                <Input type="text" label="Leiðrétt" placeholder="Leiðrétt" ref="dateofsale" style={{width: 140}} />
	                <Input type="text" label="Samþykkt" placeholder="Samþykkt" ref="dateofsale" style={{width: 140}} />

	                </div>

	                <div style={{display: 'flex', flexDirection: 'row',}}>
	                <Input type="text" label="Birting í appi" placeholder="Birting í appi" ref="dateofsale" style={{width: 140}} />
	                <Input type="text" label="Aðgangur að appi sendur" placeholder="Aðgangur að appi sendur" ref="dateofsale" style={{width: 200}} />
	                <Input type="text" label="Staðsetning" placeholder="Staðsetning" ref="dateofsale" style={{width: 140}} />
	                <Input type="text" label="Flokkur" placeholder="Flokkur" ref="dateofsale" style={{width: 140}} />

	                </div>
	            </div>
	          </Tab>
	          <Tab eventKey={4} title="Lögfræðimerking">
	            <div style={{paddingTop: '10px'}}>
	               <div>
	                <Input type="checkbox" label="Lögfræðimerkt" ref="dateofsale" style={{}} />
	               </div>
	               <div>
	                 <Input type="checkbox" label="Tala við innheimtu áður en selt er" ref="dateofsale" style={{}} />
	               </div>
	            </div>


	          </Tab>

  			</Tabs>
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
