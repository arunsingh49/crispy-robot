import React, { Component } from 'react';
import _ from 'lodash';

class TableBody extends Component {
	returnItem = (item, col) => {
		if (col && col.content) {
			return col.content(item);
		}

		return _.get(item, col.path);
	};
	render() {
		const { columns, data } = this.props;
		return (
			<tbody>
				{data.map((item) => {
					return (
						<tr key={item._id}>
							{columns.map((col) => (
								<td key={item._id + col.path}>
									{this.returnItem(item, col)}
								</td>
							))}
						</tr>
					);
				})}
			</tbody>
		);
	}
}

export default TableBody;
