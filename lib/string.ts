export const basename = (s: string) =>
{
	const split = s.split('/');

	return (split[split.length - 1]);
}
