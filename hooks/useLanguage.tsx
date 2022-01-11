import {useContext} from 'react';
import languageContext from '../context/language/languageContext';
import { Language } from '../lib/language';

const useLanguage = (): Language => {
	const { language } = useContext(languageContext);
	
	return language;
}

export default useLanguage;
