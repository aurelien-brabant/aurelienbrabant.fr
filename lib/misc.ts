export const getFirstAvailable = (els: any[]) => {
	for (const el of els) {
		if (el) {
			return el;
		}
	}
	return null;
}
