type NavTab = {
	label: string;
	route: string;
	id: number;
	children?: { label: string, route: string}[];
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
		route: "/about",
		id: 3,
	},
	{
		label: 'Resume',
		route: "/resume",
		id: 4,
	},
	{
		label: 'contact',
		route: '/contact',
		id: 5
	},
];
