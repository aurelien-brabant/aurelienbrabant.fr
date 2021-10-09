export type Dictionary = { [key: string]: { [key2: string]: string } };
export type DictionarySection = { [key: string]: string };
export type Language = 'fr' | 'en';

export const availableLanguages: Language[] = [ 'en', 'fr' ];

export const isValidLanguage = (s: string): boolean =>
{
    return availableLanguages.includes(s as Language);
}