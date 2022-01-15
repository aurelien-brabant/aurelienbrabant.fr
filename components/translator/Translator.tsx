import { useContext, Fragment } from 'react';
import languageContext from '../../context/language/languageContext';

import languageFR from '../../languages/fr.json';
import languageEN from '../../languages/en.json';

import { availableLanguages, Language } from '../../lib/language';
import useLanguage from '../../hooks/useLanguage';

const languageFiles: {[key: string]: any } =
{
	'fr': languageFR,
	'en': languageEN
}

export const useTranslate = (text: string, section?: string): string =>
{
	const { language } = useContext(languageContext);

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

type TranslatorProps = {
	section?: string;
	manual?: { [key: string]: JSX.Element }
}

/**
 * 
 * @param manual An object that has one key per language, associated with a JSX Element.
 * @returns true if all the available languages are covered, false otherwise.
 */

const validateManual = (manual: { [key:string]: JSX.Element }): boolean =>
{
	for (const requiredLanguage of availableLanguages) {
		if (manual[requiredLanguage] === undefined) {
			console.error(`Translator: missing JSX Element to display for language ${requiredLanguage}`);
			return false; /* missing element for a given language */
		}
	}
	return true;
}

export const ManualTranslator: React.FC<{ manual: { [key: string]: JSX.Element }}> = ({ manual }) =>
{
	const { language } = useContext(languageContext);

	return manual[language];
}

export const useTranslateFromObject: <T>(obj: {[key: string]: T}) => T = (obj) => {
	const language = useLanguage();

	return obj[language];
}

export const translateFromObject: <T>(lang: Language, obj: {[key: string]: T}) => T = (lang, obj) => obj[lang];

export const Translator: React.FC<TranslatorProps> = ({ children, section, manual }) =>
{
	if (manual) {
		return validateManual(manual) ? (
			<ManualTranslator manual={manual} />
		) :
		<Fragment> Manual Translation failed, please check out browser's console </Fragment>
	}
	
	return <Fragment>
		{/*eslint-disable-next-line*/}
	{useTranslate((children as string).trim(), section)}
	</Fragment>
}
