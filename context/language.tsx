import { createContext } from 'react';

export type LanguageContextData =
{
	language: 'en' | 'fr';
	setLanguage?: Function;
}

export default createContext<LanguageContextData>({
	language: 'en',
});
