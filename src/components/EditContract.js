import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Input, Button } from 'react-bootstrap';
import 'react-widgets/lib/less/react-widgets.less';
import Calendar from 'react-widgets/lib/Calendar';
import moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import Dropzone from 'react-dropzone';
import { createContract, fetchContracts } from '../actions/contract';

class EditContract extends Component {

  componentWillMount = () => {
    const { contract } = this.props;
    this.setState({contract});
  }

  editContract = (e) => {
    const { dispatch, companyId, onEdit } = this.props;
    onEdit(this.state.contract);
  }

  handleInputChange = (event) => {
   const target = event.target;
   const value = target.type === 'checkbox' ? target.checked : target.value;
   const name = target.name;

   const contract = this.state.contract;
   contract[name] = value;

   this.setState({ contract });
 }


  render() {

    let salesmen = this.props.salesmen.map(salesman => {
      return (<option key={salesman._id} value={salesman._id}>{salesman.name}</option>);
    });

    let statuses = this.props.statuses.map(status => {
	    return (
	      <option key={status._id} value={status._id}>{status.name}</option>
	    );
    });

    const categories = this.props.categories.map(category => {
      return (
        <option key={category._id} value={category._id}>{category.name}</option>
      );
    });

    return(
      <div style={{ paddingTop: 10 }}>
        <div style={{ display: 'flex' }}>
          <Input type="select" label="Verk" style={{width: '160px'}} name="category" ref="category" onChange={this.handleInputChange} value={this.state.contract.category}>
            {categories}
          </Input>
          <Input type="select" label="Flokkur" style={{width: '160px'}} name="contractcategory" ref="contractcategory" onChange={this.handleInputChange} value={this.state.contract.contractcategory}>
          </Input>
          <Input type="text" onChange={this.handleInputChange} value={this.state.contract.contractnumber} label="Samningsnúmer" placeholder="Samningsnúmer" ref="contractnumber" name="contractnumber" style={{width: 160}} />
          <Input type="file" label="Samningur" ref="file" name="file" />
        </div>
        <div style={{ display: 'flex' }}>
          <Input type="select" label="Sölumaður" onChange={this.handleInputChange} value={this.state.contract.salesman} ref="salesman" name="salesman" style={{width: '160px'}} >
            {salesmen}
          </Input>
          <Input onChange={this.handleInputChange} value={this.state.contract.salesday} ref="salesday" name="salesday" type="text" maxLength="10" label="Söludagur" placeholder="Söludagur" style={{width: 160}} />
          <Input type="select" style={{width: '160px'}} label="Tegund" ref="type" name="type" onChange={this.handleInputChange} value={this.state.contract.type}>
            <option>Ótímabundinn</option>
            <option>Tímabundinn</option>
          </Input>
          <Input type="number" label="Upphæð samnings" placeholder="Upphæð samnings" ref="contractamount" name="contractamount" onChange={this.handleInputChange} value={this.state.contract.contractamount} style={{width: 160}} />
          <Input type="number" label="Upphæð áskriftar" placeholder="Upphæð áskriftar" ref="subscriptionamount" name="subscriptionamount" onChange={this.handleInputChange} value={this.state.contract.subscriptionamount} style={{width: 160}} />
        </div>
        <div style={{ display: 'flex' }}>
          <Input type="text" label="Fyrsti gjalddagi" maxLength="10" placeholder="Fyrsti gjalddagi" ref="firstpaydate" name="firstpaydate" onChange={this.handleInputChange} value={this.state.contract.firstpaydate} style={{width: 160}} />
          <Input type="text" label="Fyrsta birting" maxLength="7" placeholder="Fyrsta birting" ref="firstdisplaydate" name="firstdisplaydate" onChange={this.handleInputChange} value={this.state.contract.firstdisplaydate} style={{width: 160}} />
          <Input type="text" label="Uppsögn" maxLength="10" placeholder="Uppsögn" ref="termination" name="termination" style={{width: 160}} />
          <Input type="text" label="Síðasti gjalddagi" maxLength="10" placeholder="Síðasti gjalddagi" ref="lastpaydate" name="lastpaydate" onChange={this.handleInputChange} value={this.state.contract.lastpaydate} style={{width: 160}} />
          <Input type="text" label="Síðasta birting" maxLength="7" placeholder="Síðasta birting" ref="lastdisplaydate" name="lastdisplaydate" onChange={this.handleInputChange} value={this.state.contract.lastdisplaydate} style={{width: 160}} />
        </div>
        <div style={{ display: 'flex' }}>
          <Input type="text" label="Tengiliður" placeholder="Tengiliður" ref="contact" name="contact" style={{width: 160}} onChange={this.handleInputChange} value={this.state.contract.contact} />
          <Input type="text" label="Sími" placeholder="Sími" ref="contactphone" name="contactphone" style={{width: 160}} onChange={this.handleInputChange} value={this.state.contract.contactphone} />
          <Input type="text" label="Netfang" placeholder="Netfang" ref="contactemail" name="contactemail" onChange={this.handleInputChange} value={this.state.contract.contractemail} style={{width: 160}} />
        </div>
        <div style={{ display: 'flex' }}>
          <Input type="text" label="Grein" placeholder="Grein" ref="article" name="article" style={{width: 160}} onChange={this.handleInputChange} value={this.state.contract.article} />
          <Input type="text" label="Auglýsing" placeholder="Auglýsing" ref="advertisement" name="advertisement" onChange={this.handleInputChange} value={this.state.contract.advertisement} style={{width: 160}} />
          <Input type="text" label="Umfjöllun/Mynd" placeholder="Umfjöllun/Mynd" ref="coverage" name="coverage" onChange={this.handleInputChange} value={this.state.contract.coverage} style={{width: 160}} />
        </div>
        <div style={{ display: 'flex' }}>
          <Input type="text" label="Ljósmyndun" maxLength="10" placeholder="Ljósmyndun" ref="photography" name="photography" onChange={this.handleInputChange} value={this.state.contract.photography} style={{ width: 160 }} />
          <Input type="text" label="Greinaskrif" maxLength="10" placeholder="Greinaskrif" ref="articlewriting" name="articlewriting" onChange={this.handleInputChange} value={this.state.contract.articlewriting} style={{width: 160}} />
        </div>
        <div style={{ display: 'flex' }}>
          <Input type="text" label="Email" maxLength="10" placeholder="Email" ref="email" name="email" style={{width: 160}} onChange={this.handleInputChange} value={this.state.contract.email} />
          <Input type="text" label="Efni komið" maxLength="10" placeholder="Efni komið" ref="contentready" name="contentready" onChange={this.handleInputChange} value={this.state.contract.contentready} style={{width: 160}} />
          <Input type="text" label="Próförk" maxLength="10" placeholder="Próförk" ref="proofs" name="proofs" onChange={this.handleInputChange} value={this.state.contract.proofs} style={{width: 160}} />
          <Input type="text" label="Leiðrétt" maxLength="10" placeholder="Leiðrétt" ref="corrected" name="corrected" onChange={this.handleInputChange} value={this.state.contract.corrected} style={{width: 160}} />
          <Input type="text" label="Samþykkt" maxLength="10" placeholder="Samþykkt" ref="approved" name="approved" onChange={this.handleInputChange} value={this.state.contract.approved} style={{width: 160}} />
        </div>
        <div>
          <Input type="text" label="Birting í appi" maxLength="10" placeholder="Birting í appi" ref="app" name="app" onChange={this.handleInputChange} value={this.state.contract.app} style={{width: 160}} />
        </div>
        <div>
          <Input type="text" label="Staðsetning" placeholder="Staðsetning" ref="location" name="location" style={{ width: 160 }} onChange={this.handleInputChange} value={this.state.contract.location} />
        </div>
        <div>
          <Input type="checkbox" label="Lögfræðimerkt" ref="legalmarked" name="legalmarked" onChange={this.handleInputChange} value={this.state.contract.legalmarked} />
          <Input type="checkbox" label="Tala við innheimtu áður en selt er" ref="contactbilling" name="contactbilling" onChange={this.handleInputChange} value={this.state.contract.contactbilling} />
        </div>
        <div style={{ display: 'flex'}}>
          <div>
            <Button
              onClick={e => this.editContract(e)}
              bsStyle="primary" style={{height:'35px'}}>
              Uppfæra
            </Button>
          </div>
          <div style={{ paddingLeft: 35 }}>
            <Button
              onClick={this.props.onCancel}
              bsStyle="primary" style={{height:'35px'}}>
              Hætta við
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

EditContract.propTypes = {
  salesmen: PropTypes.array.isRequired,
  statuses: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  companyId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  contract: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
}

export default connect()(EditContract);
