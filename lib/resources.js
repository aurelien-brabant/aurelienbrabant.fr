import fs from "fs";
import path from "path";

const resourcesDir = path.join(process.cwd(), "public/resources/");

export const getResourcesPath = (postId) =>
{
	let fileNames;

	try {
		fileNames = fs.readdirSync(resourcesDir + postId);
	} catch(err) {
		return [];
	}

	return fileNames.filter(fileName => !fileName.startsWith("."))
		.map(fileName => resourcesDir + fileName);
}
