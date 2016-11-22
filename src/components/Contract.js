import React, { Component, PropTypes } from 'react';
import { Input } from 'react-bootstrap';
import 'react-widgets/lib/less/react-widgets.less';
import Calendar from 'react-widgets/lib/Calendar';
import moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';

class Contract extends Component {
  componentWillMount(){
    moment.locale('is');
    momentLocalizer(moment);
  }

  normalizeDate = (value) => {
    if (!value) {
      return value;
    }
    const date = value.toString().replace(/[^a-zá-öø-þA-ZÀ-ÖØ-Þ\d]/g, '');

    if (date.length <= 2) {
        return date;
    }

    if(date.length <= 4 ) {
      return `${date.slice(0, 2)}${'.'}${date.slice(2, date.length)}`;
    }

    return `${date.slice(0, 2)}${'.'}${date.slice(2, 4)}${'.'}${date.slice(4, date.length)}`;
  };

  render() {

    let salesmen = this.props.salesmen.map(salesman => {
      return (<option key={salesman._id} value={salesman._id}>{salesman.name}</option>);
    });

    let statuses = this.props.statuses.map(status => {
	    return (
	      <option key={status._id} value={status._id}>{status.name}</option>
	    );
    });

    return(
      <div style={{ paddingTop: 10 }}>
        <div style={{ display: 'flex' }}>
          <Input type="text" label="Nafn" placeholder="Nafn" ref="name" style={{width: 250}} />
          <Input type="text" label="Kennitala" placeholder="Kennitala" ref="ssn" style={{width: 150}} />
          <Input type="text" label="Heimili" placeholder="Heimili" ref="address" style={{width: 250}} />
          <Input type="text" label="Pnr." placeholder="Pnr." ref="postalCode" style={{width: 80}} />
        </div>
        <div style={{ display: 'flex' }}>
          <Input type="text" label="Sími" placeholder="Sími" ref="phone" style={{width: 150}} />
          <Input type="text" label="Tengill" placeholder="Tengill" ref="link" style={{width: 250}} />
        </div>
        <div style={{ display: 'flex' }}>
          <Input type="select" style={{width: '150px'}} label="Sölumaður" ref="salesman">
            {salesmen}
          </Input>
          <Input ref="salesday" type="text" label="Söludagur" placeholder="Söludagur" style={{width: 100}} />
          <Input type="select" style={{width: '150px'}} label="Binding" ref="aa">
            <option>Ótímabundinn</option>
            <option>Tímabundinn</option>
          </Input>
        </div>
        <div>
          <Input type="file" label="Samningur" ref="link" />
        </div>
        <div style={{ display: 'flex' }}>
          <Input type="number" label="Upphæð samnings" placeholder="Upphæð samnings" ref="link" style={{width: 150}} />
          <Input type="number" label="Upphæð áskriftar" placeholder="Upphæð áskriftar" ref="link" style={{width: 150}} />
        </div>
        <div style={{ display: 'flex' }}>
          <Input type="text" label="Fyrsti gjalddagi" placeholder="Fyrsti gjalddagi" ref="salesday" style={{width: 120}} />
          <Input type="text" label="Fyrsta birting" placeholder="Fyrsta birting" ref="salesday" style={{width: 120}} />
          <Input type="text" label="Uppsögn" placeholder="Uppsögn" ref="salesday" style={{width: 120}} />
          <Input type="text" label="Síðasti gjalddagi" placeholder="Síðasti gjalddagi" ref="salesday" style={{width: 120}} />
          <Input type="text" label="Síðasta birting" placeholder="Síðasta birting" ref="salesday" style={{width: 120}} />
        </div>
        <div>
          <Input type="file" label="Grein" ref="link" />
          <Input type="file" label="Auglýsing" ref="link" />
          <Input type="file" label="Umfjöllun" ref="link" />
          <Input type="file" label="Ljósmynd" ref="salesday" />
        </div>
        <div style={{ display: 'flex' }}>
          <Input type="text" label="Greinaskrif" placeholder="Greinaskrif" ref="salesday" style={{width: 120}} />
          <Input type="text" label="Email" placeholder="Email" ref="salesday" style={{width: 120}} />
          <Input type="text" label="Efni komið" placeholder="Efni komið" ref="salesday" style={{width: 120}} />
          <Input type="text" label="Próförk" placeholder="Próförk" ref="salesday" style={{width: 120}} />
          <Input type="text" label="Leiðrétt" placeholder="Leiðrétt" ref="salesday" style={{width: 120}} />
        </div>
        <div style={{ display: 'flex' }}>
          <Input type="text" label="Samþ." placeholder="Samþ." ref="salesday" style={{width: 120}} />
          <Input type="text" label="Birting í appi" placeholder="Birting í appi" ref="salesday" style={{width: 120}} />
          <Input type="textarea" label="Staðsetning" style={{ width: 360 }} />
          <Input type="select" label="Flokkur" style={{width: '150px'}} ref="status">
            {statuses}
          </Input>
        </div>
        <div>
          <Input type="checkbox" label="Lögfræðimerkt" />
          <Input type="checkbox" label="Tala við innheimtu áður en selt er" />
        </div>
      </div>
    )
  }
}

Contract.propTypes = {
  salesmen: PropTypes.array.isRequired,
  statuses: PropTypes.array.isRequired,
}

export default Contract;
