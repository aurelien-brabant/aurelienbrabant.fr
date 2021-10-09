export type Dictionary = { [key: string]: { [key2: string]: string } };
export type DictionarySection = { [key: string]: string };
export type Language = 'fr' | 'en';

export const availableLanguages: Language[] = [ 'en', 'fr' ];
