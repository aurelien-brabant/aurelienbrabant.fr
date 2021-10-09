import { useState, useEffect } from 'react';
import { Language, availableLanguages } from '../lib/language';
import languageContext from './language';

const LanguageProvider: React.FC<{}> = ({ children }) =>
{
	const [ language, setLanguage] = useState<Language>('en');

	useEffect(() => {
		const storedLanguage = window.localStorage.getItem('language');

		if (storedLanguage && availableLanguages.includes(storedLanguage as Language)) {
			setLanguage(storedLanguage as Language);
		} else {
			console.error(`Could not load language "${storedLanguage}" as it does not refer to a supported language value.`);
		}
		
	}, []);

	return (
		<languageContext.Provider
			value={{
				language,
				setLanguage
			}}
		>
			{ children }
		</languageContext.Provider>
	);
}

export default LanguageProvider;
