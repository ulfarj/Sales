import React, { PropTypes, Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import { find } from 'lodash';

const Contracts = (props) => {

  const contracts = props.contracts.map(contract => {    

    let amount = 0;
    if(contract.contractamount) {
      amount = contract.contractamount;
    } else if(contract.subscriptionamount) {
      amount = (contract.subscriptionamount * 12);
    }

    return (
      <tr>
        {/*<td 
          style={{ fontSize: '14px', paddingBottom: '10px' }}
        >
          {find(props.salesmen, ['_id', contract.salesman]).name}
        </td>*/}
        <td style={{fontSize: '14px', paddingBottom: '10px'}}>
          {find(props.categories, ['_id', contract.category]).name}
        </td>
        <td style={{fontSize: '14px', paddingBottom: '10px'}}>
          {contract.firstdisplaydate}
        </td>
        <td style={{fontSize: '14px', paddingBottom: '10px'}}>
          {contract.lastdisplaydate}
        </td>
        <td style={{fontSize: '14px', paddingBottom: '10px'}}>
          {amount}
        </td>        
        <td>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <Button
              onClick={() => props.onDisplay(contract)}
              bsStyle="primary" style={{ height:'35px', marginRight: '10px' }}>
              Skoða
            </Button>
            <Button
              onClick={() => props.onEdit(contract)}
              bsStyle="primary" style={{ height:'35px', marginRight: '10px' }}>
              Breyta
            </Button>
            <Button
              onClick={() => props.onDelete(contract)}
              bsStyle="primary" style={{height:'35px'}}>
              Eyða
            </Button>
          </div>
        </td>
      </tr>
    );
  });

  if (contracts.length === 0){
    return(<div />);
  }

  return (
    <Table style={{padding: '20px;'}} striped bordered>
      <thead>
        <tr>          
          <td>Verk</td>
          <td>Fyrsta birting</td>
          <td>Síðasta birting</td>
          <td>Upphæð</td>
        </tr>
      </thead>
      <tbody>
        {contracts}
      </tbody>
    </Table>
  )
}

Contracts.propTypes = {
  contracts: PropTypes.array.isRequired,
  salesmen: PropTypes.array.isRequired,
  statuses: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default Contracts;
