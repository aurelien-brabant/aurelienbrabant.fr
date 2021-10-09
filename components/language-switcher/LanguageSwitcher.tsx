import { availableLanguages } from '../../lib/language';
import { useContext } from 'react';
import languageContext from '../../context/language/languageContext';
import styles from './languageSwitcher.module.css'

const LanguageSwitcher = () =>
{
	const { language, setLanguage } = useContext(languageContext);

	return (
		<div
			className={styles.languageWrapper}
		>
			{ availableLanguages.map(lang => (
			<img
				key={`${lang}-flag`}
				src={`/language-flag/${lang}.svg`}
				alt={`select-language-${lang}`}
				className={`${lang === language ? styles.selected : ''}`}
				onClick={() => {
					setLanguage!(lang);
					window.localStorage.setItem('language', lang);
				}}
			/>
			))}
		</div>
	);
}

export default LanguageSwitcher;
