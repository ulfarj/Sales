import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Input, Button, PanelGroup, Panel } from 'react-bootstrap';
import 'react-widgets/lib/less/react-widgets.less';
import Calendar from 'react-widgets/lib/Calendar';
import moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import Dropzone from 'react-dropzone';
//import b64toBlob from 'b64-to-blob';
import { createContract, fetchContracts } from '../actions/contract';
import { downloadFileFromBase64 } from '../utils/files';

class DisplayContract extends Component {

 componentWillMount = () => {
    const { contract } = this.props;
    this.setState({contract});   
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

    const val = this.state.contract;

    const mainGroups = _.filter(this.props.groups, { 'type': 'Yfirflokkur'}).map(group =>
      <option value={group.name}>{group.name}</option>
    );

    const subGroups = _.filter(this.props.groups, { 'type': 'Undirflokkur', 'parent': val.contractmaincategory}).map(group =>
      <option value={group.name}>{group.name}</option>
    );
   
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
                disabled
              >
                {categories}
              </Input>
              <Input
                type="select"
                label="Yfirflokkur"
                style={{width: '160px'}}
                ref="contractmaincategory"
                name="contractmaincategory"
                value={val.contractmaincategory}
                disabled
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
                disabled
              >
                <option value='choose'>Veljið undirflokk</option>
                {subGroups}
              </Input>
            </div>
            <div style={{ display: 'flex', paddingTop: 10 }}>
              <Input
                type="select"
                label="Sölumaður"
                ref="salesman"
                name="salesman"
                style={{width: '160px'}}
                value={val.salesman}
                disabled
              >
                {salesmen}
              </Input>
              <Input
                disabled={true}
                readOnly={true}
                ref="salesday"
                name="salesday"
                type="text"
                maxLength="10"
                label="Söludagur"
                placeholder="Söludagur"
                style={{width: 160}}
                value={val.salesday}
                disabled
              />
              <Input type="text"
                label="Samningsnúmer"
                placeholder="Samningsnúmer"
                ref="contractnumber"
                name="contractnumber"
                style={{width: 160}}
                value={val.contractnumber}
                onChange={this.handleInputChange}
                disabled
              />
              {val.file &&
                <div style={{ paddingTop: 24 }}>
                  <Button 
                    onClick={() => downloadFileFromBase64(val.file)}
                  >
                    Sækja samning
                  </Button>
                </div>
              }
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
                disabled
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
                disabled
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
                disabled
              />
            </div>
            <div style={{ display: 'flex', paddingTop: 10 }}>
              <Input
                type="text"
                label="Fyrsta birting"
                maxLength="10"
                placeholder="Fyrsta birting"
                ref="firstdisplaydate"
                value={val.firstdisplaydate}
                style={{width: 160}}
                name="firstdisplaydate"
                onChange={this.handleInputChange}
                disabled
              />
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
                disabled
              />
              <Input
                type="text"
                label="Síðasta birting"
                maxLength="10"
                placeholder="Síðasta birting"
                ref="lastdisplaydate"
                name="lastdisplaydate"
                value={val.lastdisplaydate}
                style={{width: 160}}
                onChange={this.handleInputChange}
                disabled
              />
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                  disabled
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
                  disabled
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
                disabled
              />
              <Input
                type="checkbox"
                label="Tala við innheimtu áður en selt er"
                ref="contactbilling"
                name="contactbilling"
                checked={val.contactbilling}                
                disabled
              />
            </div>
          </Panel>
        </PanelGroup>  
        <div>
        <Button
          onClick={this.props.onCancel}
          bsStyle="primary" style={{height:'35px'}}>
          Til baka
        </Button>
        </div>              
      </div>
    )
  }
}

DisplayContract.propTypes = {
  salesmen: PropTypes.array.isRequired,
  statuses: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  groups: PropTypes.array.isArray,
  companyId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  contract: PropTypes.object.isRequired,  
}

export default connect()(DisplayContract);
