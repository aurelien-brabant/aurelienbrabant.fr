import { translate } from "../components/translator/Translator";

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
		label: 'blog',
		route: '/blog',
		id: 1
	},
	{
		label: 'about',
		route: '/about',
		id: 2,
	},
	{
		label: 'contact',
		route: '/contact',
		id: 3
	}
];
