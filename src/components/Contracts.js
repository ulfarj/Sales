import React, { PropTypes } from 'react';

const Contracts = (props) => {

  //return(<div>'test'</div>);
  console.log('yo');
  console.log(props.contracts);

  const contracts = props.contracts.map(contract => {
    return (
        <tr>
          <td>
            {contract.salesman}
          </td>
          <td>
            {contract.category}
          </td>
        </tr>
    );
  });

  return (
    <table>
      {contracts}
    </table>
  );
}

Contracts.propTypes = {
  contracts: PropTypes.array.isRequired,
};

export default Contracts;
