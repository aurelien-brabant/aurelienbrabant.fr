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
		children: [
			{
				label: 'Who am I?',
				route: '/about'
			},
			{
				label: 'Resume',
				route: '/resume'
			}
		],
		id: 3,
	},
	{
		label: 'contact',
		route: '/contact',
		id: 4
	},
];
