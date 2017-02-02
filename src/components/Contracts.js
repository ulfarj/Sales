import React, { PropTypes, Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import { find } from 'lodash';

const Contracts = (props) => {

  const contracts = props.contracts.map(contract => {
    return (
      <tr>
        <td style={{fontSize: '14px', paddingBottom: '10px'}}>
          {find(props.salesmen, ['_id', contract.salesman]).name}
        </td>
        <td style={{fontSize: '14px', paddingBottom: '10px'}}>
          {find(props.categories, ['_id', contract.category]).name}
        </td>
        <td style={{fontSize: '14px', paddingBottom: '10px'}}>
          {contract.contractnumber}
        </td>
        <td>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <Button
              onClick={() => props.onEdit(contract)}
              bsStyle="primary" style={{height:'35px', marginRight: '10px'}}>
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
          <td>Sölumaður</td>
          <td>Verk</td>
          <td>Samningsnúmer</td>
          <td>

          </td>
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
