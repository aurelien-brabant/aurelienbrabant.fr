type NavTab = {
	label: string;
	route: string;
	id: number;
}

export const navtabs: NavTab[] = [
	{
		label: 'home',
		route: '/',
		id: 0
	},
	{
		label: 'projects',
		route: '/projects',
		id: 1,
	},
	{
		label: 'blog',
		route: '/blog',
		id: 2
	},
	{
		label: 'about',
		route: '/about',
		id: 3,
	},
	{
		label: 'contact',
		route: '/contact',
		id: 4
	}
];
