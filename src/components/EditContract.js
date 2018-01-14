import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Input, Button, PanelGroup, Panel } from 'react-bootstrap';
import 'react-widgets/lib/less/react-widgets.less';
import Calendar from 'react-widgets/lib/Calendar';
import moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import Dropzone from 'react-dropzone';
import { createContract, fetchContracts } from '../actions/contract';
import { downloadFileFromBase64 } from '../utils/files';

class EditContract extends Component {

  constructor(props) {
     super(props);
     this.state = {
       parent: null,       
     }
  }

  componentWillMount = () => {
    const { contract } = this.props;
    this.setState({contract});
    this.setState({ parent: contract.contractmaincategory });
  }

  editContract = (e) => {
    const { dispatch, companyId, onEdit } = this.props;    
    onEdit(this.state.contract);
  }

  uploadFile = (event) => {
    const file = event.target.files[0];
    var reader = new FileReader();

    reader.addEventListener("load", function () {
      const contract = this.state.contract;
      contract.file = reader.result;   
      console.log(contract.file);
      this.setState({ contract });
    }.bind(this), false);
  
    if (file) {
      reader.readAsDataURL(file);
    }    
  }

  handleInputChange = (event) => {
   const target = event.target;

   const value = target.type === 'checkbox' ? target.checked : target.value;
   const name = target.name;

   const contract = this.state.contract;
   contract[name] = value;

   this.setState({ contract });
 }

 setMainGroup = () => {
   this.setState({parent: this.refs.contractmaincategory.getValue()});
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

    const mainGroups = _.filter(this.props.groups, { 'type': 'Yfirflokkur'}).map(group =>
      <option value={group.name}>{group.name}</option>
    );

    const subGroups = _.filter(this.props.groups, { 'type': 'Undirflokkur', 'parent': this.state.parent}).map(group =>
      <option value={group.name}>{group.name}</option>
    );

    const val = this.state.contract;

    return(
      <div style={{ paddingTop: 10 }}>
        <PanelGroup>
          <Panel header="+ Samningur" collapsible>
            <div style={{ display: 'flex', paddingTop: 10 }}>
              <Input
                type="select"
                label="Verk"
                style={{width: '160px'}}
                ref="category"
                name="category"
                value={val.category}
                onChange={this.handleInputChange}
              >
                {categories}
              </Input>
              <Input
                type="select"
                label="Yfirflokkur"
                style={{width: '160px'}}
                onChange={this.setMainGroup}
                ref="contractmaincategory"
                name="contractmaincategory"
                value={val.contractmaincategory}
              >
                <option value='choose'>Veljið yfirflokk</option>
                {mainGroups}
              </Input>

              <Input
                type="select"
                label="Undirflokkur"
                style={{width: '160px'}}
                ref="contractsubcategory"
                name="contractsubcategory"
                value={val.contractsubcategory}
                onChange={this.handleInputChange}
              >
                <option value='choose'>Veljið undirflokk</option>
                {subGroups}
              </Input>               
              {val.file &&             
                <div style={{ paddingTop: 24 }}>   
                  <Button 
                    onClick={() => downloadFileFromBase64(val.file)}
                  >
                    Sækja núverandi samning
                  </Button>
                </div>                
              }
            </div>
            <div style={{ display: 'flex', paddingTop: 10 }}>
              <Input
                type="select"
                label="Sölumaður"
                ref="salesman"
                name="salesman"
                style={{width: '160px'}}
                value={val.salesman}
                onChange={this.handleInputChange}
              >
                {salesmen}
              </Input>
              <Input
                ref="salesday"
                name="salesday"
                type="text"
                maxLength="10"
                label="Söludagur"
                placeholder="Söludagur"
                style={{width: 160}}
                value={val.salesday}
                onChange={this.handleInputChange}
              />
              <Input type="text"
                label="Samningsnúmer"
                placeholder="Samningsnúmer"
                ref="contractnumber"
                name="contractnumber"
                style={{width: 160}}
                value={val.contractnumber}
                onChange={this.handleInputChange}
              />             
              <Input
                type="file"
                label="Samningur"
                ref="file"
                name="file"
                value={val.file}
                onChange={this.uploadFile}
              />
            </div>
            <div style={{ display: 'flex', paddingTop: 10 }}>
              <Input
                type="select"
                style={{width: '160px'}}
                label="Tegund"
                ref="type"
                name="type"
                onChange={this.handleInputChange}
                value={val.type}
              >
                <option>Ótímabundinn</option>
                <option>Tímabundinn</option>
              </Input>
              <Input
                type="number"
                label="Upphæð samnings"
                placeholder="Upphæð samnings"
                ref="contractamount"
                name="contractamount"
                style={{width: 160}}
                onChange={this.handleInputChange}
                value={val.contractamount}
              />
              <Input
                type="number"
                label="Upphæð áskriftar"
                placeholder="Upphæð áskriftar"
                ref="subscriptionamount"
                name="subscriptionamount"
                style={{width: 160}}
                onChange={this.handleInputChange}
                value={val.subscriptionamount}
              />
            </div>
            <div style={{ display: 'flex', paddingTop: 10 }}>
              <Input
                type="text"
                label="Fyrsta birting"
                maxLength="4"
                placeholder="Útgáfa"
                ref="firstdisplaydatepublish"
                value={val.firstdisplaydatepublish}
                style={{width: 80}}
                name="firstdisplaydatepublish"
                onChange={this.handleInputChange}
              />
              <div style={{paddingTop: 25}}>
                <Input
                  type="text"                
                  maxLength="4"
                  placeholder="Ár"
                  ref="firstdisplaydateyear"
                  value={val.firstdisplaydateyear}
                  style={{width: 80}}
                  name="firstdisplaydateyear"
                  onChange={this.handleInputChange}
                />
              </div>
              <Input
                type="text"
                label="Uppsögn"
                maxLength="10"
                placeholder="Uppsögn"
                ref="termination"
                name="termination"
                value={val.termination}
                style={{width: 160}}
                onChange={this.handleInputChange}
              />
              <Input
                type="text"
                label="Síðasta birting"
                maxLength="4"
                placeholder="Útfáfa"
                ref="lastdisplaydatepublish"
                name="lastdisplaydatepublish"
                value={val.lastdisplaydatepublish}
                style={{width: 80}}
                onChange={this.handleInputChange}
              />
              <div style={{paddingTop: 25}}>
                <Input
                  type="text"                  
                  maxLength="10"
                  placeholder="Ár"
                  ref="lastdisplaydateyear"
                  name="lastdisplaydateyear"
                  value={val.lastdisplaydateyear}
                  style={{width: 80}}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div style={{ display: 'flex', paddingTop: 10 }}>
              <Input
                type="text"
                label="Fyrsti gjalddagi"
                maxLength="10"
                placeholder="Fyrsti gjalddagi"
                ref="firstpaydate"
                name="firstpaydate"
                value={val.firstpaydate}
                style={{width: 160}}
                onChange={this.handleInputChange}
              />
              <Input
                type="text"
                label="Síðasti gjalddagi"
                maxLength="10"
                placeholder="Síðasti gjalddagi"
                ref="lastpaydate"
                name="lastpaydate"
                value={val.lastpaydate}
                style={{width: 160}}
                onChange={this.handleInputChange}
              />
            </div>
            <div style={{ display: 'flex', paddingTop: 10 }}>
              <Input
                type="text"
                label="Tengiliður"
                placeholder="Tengiliður"
                ref="contact"
                name="contact"
                value={val.contact}
                style={{width: 160}}
                onChange={this.handleInputChange}
              />
              <Input
                type="text"
                label="Sími"
                placeholder="Sími"
                ref="contactphone"
                name="contactphone"
                value={val.contactphone}
                style={{width: 160}}
                onChange={this.handleInputChange}
              />
              <Input
                type="text"
                label="Netfang"
                placeholder="Netfang"
                ref="contactemail"
                name="contactemail"
                value={val.contactemail}
                style={{width: 160}}
                onChange={this.handleInputChange}
              />
            </div>
            <div style={{ display: 'flex', paddingTop: 10 }}>
              <Input
                type="text"
                label="Grein"
                placeholder="Grein"
                ref="article"
                name="article"
                value={val.article}
                style={{width: 160}}
                onChange={this.handleInputChange}
              />
              <Input
                type="text"
                label="Auglýsing"
                placeholder="Auglýsing"
                ref="advertisement"
                name="advertisement"
                value={val.advertisement}
                style={{width: 160}}
                onChange={this.handleInputChange}
              />
              <Input
                type="text"
                label="Umfjöllun/Mynd"
                placeholder="Umfjöllun/Mynd"
                ref="coverage"
                name="coverage"
                value={val.coverage}
                style={{width: 160}}
                onChange={this.handleInputChange}
              />
            </div>
            <div style={{ display: 'flex', paddingTop: 10, paddingBottom: 10 }}>
              <Input
                type="text"
                label="Ljósmyndun"
                maxLength="10"
                placeholder="Ljósmyndun"
                ref="photography"
                name="photography"
                value={val.photography}
                style={{ width: 160 }}
                onChange={this.handleInputChange}
              />
              <Input
                type="text"
                label="Greinaskrif"
                maxLength="10"
                placeholder="Greinaskrif"
                ref="articlewriting"
                name="articlewriting"
                value={val.articlewriting}
                style={{width: 160}}
                onChange={this.handleInputChange}
              />
            </div>
          </Panel>
          <Panel header="+ Efnisöflun" collapsible>
            <div style={{ display: 'flex', paddingTop: 10 }}>
              <Input
                type="text"
                label="Email"
                maxLength="10"
                placeholder="Email"
                ref="email"
                name="email"
                value={val.email}
                style={{width: 160}}
                onChange={this.handleInputChange}
              />
              <Input
                type="text"
                label="Efni komið"
                maxLength="10"
                placeholder="Efni komið"
                ref="contentready"
                name="contentready"
                value={val.contentready}
                style={{width: 160}}
                onChange={this.handleInputChange}
              />
              <Input
                type="text"
                label="Próförk"
                maxLength="10"
                placeholder="Próförk"
                ref="proofs"
                name="proofs"
                value={val.proofs}
                style={{width: 160}}
                onChange={this.handleInputChange}
              />
              <Input
                type="text"
                label="Leiðrétt"
                maxLength="10"
                placeholder="Leiðrétt"
                ref="corrected"
                name="corrected"
                value={val.corrected}
                style={{width: 160}}
                onChange={this.handleInputChange}
              />
              <Input
                type="text"
                label="Samþykkt"
                maxLength="10"
                placeholder="Samþykkt"
                ref="approved"
                name="approved"
                value={val.approved}
                style={{width: 160}}
                onChange={this.handleInputChange}
              />
            </div>
            <div style={{ paddingTop: 10 }}>
              <div>
                <Input
                  type="text"
                  label="Birting í appi"
                  maxLength="10"
                  placeholder="Birting í appi"
                  ref="app"
                  name="app"
                  value={val.app}
                  style={{width: 160}}
                  onChange={this.handleInputChange}
                />
              </div>
              <div>
                <Input
                  type="text"
                  label="Staðsetning"
                  placeholder="Staðsetning"
                  ref="location"
                  name="location"
                  value={val.location}
                  style={{ width: 160 }}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>

            <div style={{ paddingTop: 30 }}>
              <Input
                type="checkbox"
                label="Lögfræðimerkt"
                ref="legalmarked"
                name="legalmarked"
                checked={val.legalmarked}
                onChange={this.handleInputChange}
              />
              <Input
                type="checkbox"
                label="Tala við innheimtu áður en selt er"
                ref="contactbilling"
                name="contactbilling"
                checked={val.contactbilling}
                onChange={this.handleInputChange}
              />
            </div>
          </Panel>
        </PanelGroup>
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
  groups: PropTypes.array.isArray,
  companyId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  contract: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
}

export default connect()(EditContract);
