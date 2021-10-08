import { createContext } from 'react';

export type LanguageContextData =
{
	section: string;
	language: 'en' | 'fr';
}

export default createContext<LanguageContextData>({
	section: 'index',
	language: 'en'
});
