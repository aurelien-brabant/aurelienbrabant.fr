export const readtimeInMinutes = (content: string): number =>
{
	const tmp = content.match(/(\w+)/g);

	return tmp ? Math.floor(tmp.length / 210) : 0;
}
