type NavTab = {
	label: string
	route: string
	id: number
	children?: { label: string; route: string }[]
}

export const navtabs: NavTab[] = [
	{
		label: 'services',
		route: '/#services',
		id: 6
	},
	{
		label: 'about',
		route: '/about',
		id: 3,
	},
	{
		label: 'contact',
		route: '/contact',
		id: 5,
	},

	{
		label: 'blog',
		route: '/blog',
		id: 2,
	},
	{
		label: 'projects',
		route: '/projects',
		id: 1,
	},
]
