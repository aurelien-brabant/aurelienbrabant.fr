export const buildClassName = (classNames: (string | null | undefined)[]): string => {
	return classNames.map(className => className ? className : '').join(' ');
}
