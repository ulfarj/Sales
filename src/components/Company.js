import React, { Component, PropTypes } from 'react';

class Company extends Component {

	onClick = (companyId) => {
		this.props.onClick(companyId);
	};

	render() {
		let {sales} = this.props;

		let x = 0;
		let cx = 0;
		let statuses = sales.map(sale => {

			x = x + 15;
			if(sale.selected)
			{
				return (
					<rect width="12" height="12" x={x} y="3" stroke="black" strokeWidth="1" fill={sale.color}>
						<title>{sale.category} - {sale.salesman} - {sale.status}</title>
					</rect>
					);
			}

			cx = cx + 15;
			return (
				<circle cx={cx} cy="8" r="6" stroke="black" strokeWidth="1" fill={sale.color}>
					<title>{sale.category} - {sale.salesman} - {sale.status}</title>
				</circle>
			);
		});

		return(
			<svg width="100" height="16">
				{statuses}
			</svg>
		);
	}

}

export default Company;
