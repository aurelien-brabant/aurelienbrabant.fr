export const strip = (s: string, n: number): string =>
{
	if (s.length <= n) return s;

	return `${s.substr(0, n)}...`;
}
