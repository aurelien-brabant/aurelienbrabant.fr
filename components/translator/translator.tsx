import { useContext, Fragment } from 'react';
import LanguageContext from '../../context/language';

import languageFR from '../../languages/fr.json';
import languageEN from '../../languages/en.json';

const languageFiles: {[key: string]: any } =
{
	'fr': languageFR,
	'en': languageEN
}

const translate = (text: string, section?: string): string =>
{
	const { language } = useContext(LanguageContext);

	for (const key in languageFiles) {
		if (key === language) {
			if (section) {
				return languageFiles[key][section][text] || text;
			} else {
				return languageFiles[key][text] || text;
			}
		}
	}

	return text;
}

export const Translator: React.FC<{ section?: string }> = ({ children, section }) =>
{
	return <Fragment>
	{translate((children as string).trim(), section)}
	</Fragment>
}
