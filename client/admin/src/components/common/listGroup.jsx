import React from 'react';

const ListGroup = ({ items, selectedItem, onItemSelect }) => {
	return (
		<div className="list-group">
			<ul className="list-group clickable">
				{items.map((item) => {
					return (
						<li
							key={item._id}
							className={
								item === selectedItem
									? 'list-group-item active'
									: 'list-group-item'
							}
							onClick={() => onItemSelect(item)}
						>
							{item.name}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default ListGroup;
