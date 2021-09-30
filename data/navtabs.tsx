type NavTab = {
	label: string;
	route: string;
	id: number;
}

export const navtabs: NavTab[] = [
	{
		label: 'Home',
		route: '/',
		id: 0
	},
	{
		label: 'Blog',
		route: '/blog',
		id: 1
	},
	{
		label: 'Contact',
		route: '/contact',
		id: 2
	}
];
