export const textToCSSId = (text: string): string =>
{
	return text.toLowerCase().replace(/"|'|`|\!|\?|,|;|\(|\)|:/g, '') // remove a list of unwanted characters
		.replace(/\s/g, '-') // replace whitespaces by dashes
		.replace(/(\-)\1+/g, '-') // replace consecutive dashes by only one
		.replace(/\-+$/g, ''); // remove trailing dashes
}
