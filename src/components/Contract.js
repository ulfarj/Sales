import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Input, Button, Accordion, Panel, PanelGroup } from 'react-bootstrap';
import 'react-widgets/lib/less/react-widgets.less';
import Calendar from 'react-widgets/lib/Calendar';
import moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import Dropzone from 'react-dropzone';
import _ from 'lodash';
import { fetchContracts } from '../actions/contract';

class Contract extends Component {

  constructor(props) {
     super(props);
     this.state = {
       parent: null,
     }
  }

  createContract = (e) => {
    const { dispatch, companyId, onCreate } = this.props;

    const contract = {
      companyId: companyId,
      category: this.refs.category.getValue(),
      contractmaincategory: this.refs.contractmaincategory.getValue(),
      contractsubcategory: this.refs.contractsubcategory.getValue(),
      contractnumber: this.refs.contractnumber.getValue(),
      file: this.refs.file.getValue(),
      salesman: this.refs.salesman.getValue(),
      salesday: this.refs.salesday.getValue(),
      type: this.refs.type.getValue(),
      contractamount: this.refs.contractamount.getValue(),
      subscriptionamount: this.refs.subscriptionamount.getValue(),
      firstpaydate: this.refs.firstpaydate.getValue(),
      firstdisplaydate: this.refs.firstdisplaydate.getValue(),
      lastdisplaydate: this.refs.lastdisplaydate.getValue(),
      termination: this.refs.termination.getValue(),
      lastpaydate: this.refs.lastpaydate.getValue(),
      contact: this.refs.contact.getValue(),
      contactphone: this.refs.contactphone.getValue(),
      contactemail: this.refs.contactemail.getValue(),
      article: this.refs.article.getValue(),
      advertisement: this.refs.advertisement.getValue(),
      coverage: this.refs.coverage.getValue(),
      photography: this.refs.photography.getValue(),
      articlewriting: this.refs.articlewriting.getValue(),
      contentready: this.refs.contentready.getValue(),
      email: this.refs.email.getValue(),
      contentready: this.refs.contentready.getValue(),
      proofs: this.refs.proofs.getValue(),
      corrected: this.refs.corrected.getValue(),
      approved: this.refs.approved.getValue(),
      app: this.refs.app.getValue(),
      location: this.refs.location.getValue(),
      legalmarked: this.refs.legalmarked.getValue(),
      contactbilling: this.refs.contactbilling.getValue(),
    };

    onCreate(contract);
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

    return(
      <div style={{ paddingTop: 10 }}>
        <PanelGroup>
          <Panel header="+ Samningur" collapsible>
            <div style={{ display: 'flex', paddingTop: 10 }}>
              <Input type="select" label="Verk" style={{width: '160px'}} ref="category">
                {categories}
              </Input>
              <Input
                type="select"
                label="Yfirflokkur"
                style={{width: '160px'}}
                onChange={this.setMainGroup}
                ref="contractmaincategory"
              >
                <option value='choose'>Veljið yfirflokk</option>
                {mainGroups}
              </Input>
              <Input type="select" label="Undirflokkur" style={{width: '160px'}} ref="contractsubcategory">
                <option value='choose'>Veljið undirflokk</option>
                {subGroups}
              </Input>
            </div>
            <div style={{ display: 'flex', paddingTop: 10 }}>
              <Input type="select" label="Sölumaður" ref="salesman" style={{width: '160px'}} >
                {salesmen}
              </Input>
              <Input ref="salesday" type="text" maxLength="10" label="Söludagur" placeholder="Söludagur" style={{width: 160}} />
              <Input type="text" label="Samningsnúmer" placeholder="Samningsnúmer" ref="contractnumber" style={{width: 160}} />
              <Input type="file" label="Samningur" ref="file" />
            </div>
            <div style={{ display: 'flex', paddingTop: 10 }}>
              <Input type="select" style={{width: '160px'}} label="Tegund" ref="type">
                <option>Ótímabundinn</option>
                <option>Tímabundinn</option>
              </Input>
              <Input type="number" label="Upphæð samnings" placeholder="Upphæð samnings" ref="contractamount" style={{width: 160}} />
              <Input type="number" label="Upphæð áskriftar" placeholder="Upphæð áskriftar" ref="subscriptionamount" style={{width: 160}} />
            </div>
            <div style={{ display: 'flex', paddingTop: 10 }}>
              <Input type="text" label="Fyrsta birting" maxLength="10" placeholder="Fyrsta birting" ref="firstdisplaydate" style={{width: 160}} />
              <Input type="text" label="Uppsögn" maxLength="10" placeholder="Uppsögn" ref="termination" style={{width: 160}} />
              <Input type="text" label="Síðasta birting" maxLength="10" placeholder="Síðasta birting" ref="lastdisplaydate" style={{width: 160}} />
            </div>
            <div style={{ display: 'flex', paddingTop: 10 }}>
              <Input type="text" label="Fyrsti gjalddagi" maxLength="10" placeholder="Fyrsti gjalddagi" ref="firstpaydate" style={{width: 160}} />
              <Input type="text" label="Síðasti gjalddagi" maxLength="10" placeholder="Síðasti gjalddagi" ref="lastpaydate" style={{width: 160}} />
            </div>
            <div style={{ display: 'flex', paddingTop: 10 }}>
              <Input type="text" label="Tengiliður" placeholder="Tengiliður" ref="contact" style={{width: 160}} />
              <Input type="text" label="Sími" placeholder="Sími" ref="contactphone" style={{width: 160}} />
              <Input type="text" label="Netfang" placeholder="Netfang" ref="contactemail" style={{width: 160}} />
            </div>
            <div style={{ display: 'flex', paddingTop: 10 }}>
              <Input type="text" label="Grein" placeholder="Grein" ref="article" style={{width: 160}} />
              <Input type="text" label="Auglýsing" placeholder="Auglýsing" ref="advertisement" style={{width: 160}} />
              <Input type="text" label="Umfjöllun/Mynd" placeholder="Umfjöllun/Mynd" ref="coverage" style={{width: 160}} />
            </div>
            <div style={{ display: 'flex', paddingTop: 10, paddingBottom: 10 }}>
              <Input type="text" label="Ljósmyndun" maxLength="10" placeholder="Ljósmyndun" ref="photography" style={{ width: 160 }} />
              <Input type="text" label="Greinaskrif" maxLength="10" placeholder="Greinaskrif" ref="articlewriting" style={{width: 160}} />
            </div>
          </Panel>
          <Panel header="+ Efnisöflun" collapsible>
            <div style={{ display: 'flex', paddingTop: 10 }}>
              <Input type="text" label="Email" maxLength="10" placeholder="Email" ref="email" style={{width: 160}} />
              <Input type="text" label="Efni komið" maxLength="10" placeholder="Efni komið" ref="contentready" style={{width: 160}} />
              <Input type="text" label="Próförk" maxLength="10" placeholder="Próförk" ref="proofs" style={{width: 160}} />
              <Input type="text" label="Leiðrétt" maxLength="10" placeholder="Leiðrétt" ref="corrected" style={{width: 160}} />
              <Input type="text" label="Samþykkt" maxLength="10" placeholder="Samþykkt" ref="approved" style={{width: 160}} />
            </div>
            <div style={{ paddingTop: 10 }}>
              <div>
                <Input type="text" label="Birting í appi" maxLength="10" placeholder="Birting í appi" ref="app" style={{width: 160}} />
              </div>
              <div>
                <Input type="text" label="Staðsetning" placeholder="Staðsetning" ref="location" style={{ width: 160 }} />
              </div>
            </div>

            <div style={{ paddingTop: 30 }}>
              <Input type="checkbox" label="Lögfræðimerkt" ref="legalmarked" />
              <Input type="checkbox" label="Tala við innheimtu áður en selt er" ref="contactbilling" />
            </div>
          </Panel>
        </PanelGroup>
        <div style={{ display: 'flex'}}>
          <div>
            <Button
              onClick={e => this.createContract(e)}
              bsStyle="primary" style={{height:'35px'}}>
              Stofna
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

Contract.propTypes = {
  salesmen: PropTypes.array.isRequired,
  statuses: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  groups: PropTypes.array.isRequired,
  companyId: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
}

export default connect()(Contract);
