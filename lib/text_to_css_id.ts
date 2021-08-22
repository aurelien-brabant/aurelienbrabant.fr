export const textToCSSId = (text: string): string =>
{
	return text.toLowerCase().replace(/"|'|`|\!|\?|,|;|\(|\)|/g, '').replace(/\s/g, '-').replace(/(\-)\1+/g, '-').replace(/\-+$/g, '');
}
