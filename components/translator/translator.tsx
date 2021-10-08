import { useContext, Fragment } from 'react';
import LanguageContext from '../../context/language';

import languageFR from '../../languages/fr.json';
import languageEN from '../../languages/en.json';

const languages: {[key: string]: { [key: string]: { [key: string]: string }}} =
{
	'fr': languageFR,
	'en': languageEN
}

const translate = (text: string): string =>
{
	const { language: currentLanguage, section } = useContext(LanguageContext);

	if (Object.keys(languages).includes(currentLanguage)) {
		if (languages[currentLanguage][section]) {
			return languages[currentLanguage][section][text]
			!== undefined ? languages[currentLanguage][section][text] : text;
		}
	}

	return text;
}

export const Translator: React.FC<{}> = ({ children }) =>
{
	return <Fragment>
	{translate((children as string).trim())}
	</Fragment>
}
