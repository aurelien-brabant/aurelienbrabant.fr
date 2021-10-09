import { availableLanguages } from '../../lib/language';
import { useContext } from 'react';
import LanguageContext from '../../context/language';
import styles from './languageSwitcher.module.css'

const LanguageSwitcher = () =>
{
	const { language, setLanguage } = useContext(LanguageContext);

	return (
		<div
			className={styles.languageWrapper}
		>
			{ availableLanguages.map(lang => (
			<img
				src={`/language-flag/${lang}.svg`}
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
