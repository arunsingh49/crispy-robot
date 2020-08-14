import React from 'react';

const TableHeader = ({ columns }) => {
	return (
		<thead className="clickable">
			<tr>
				{columns.map((col) => {
					return <td key={col.path}>{col.label}</td>;
				})}
			</tr>
		</thead>
	);
};

export default TableHeader;
