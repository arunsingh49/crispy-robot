export const categories = [
	{ _id: '5edf209d76d7dc4916e3096c', name: 'Weight Loss' },
	{ _id: '5edf209d76d7dc4916e3096b', name: 'Running' },
	{ _id: '5edf209d76d7dc4916e3096d', name: 'Garlic' },
];

export function getCategories() {
	return categories.filter((g) => g);
}
