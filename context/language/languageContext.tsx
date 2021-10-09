import { createContext } from 'react';
import { Language } from '../../lib/language'

export type LanguageContextData =
{
	language: Language;
	setLanguage?: Function;
}

export default createContext<LanguageContextData>({
	language: 'en',
});