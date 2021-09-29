import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "posts");

/*
** Get the markdown posts meta, sorted in order.
*/

export function getPostsMeta() {
	const fileNames = fs.readdirSync(postsDir);
	const postsData =
	fileNames
	.filter(fileName => !fileName.startsWith("."))
	.map(fileName => {
		const id = fileName.replace(/\.md$/, '');

		const fullPath = path.join(postsDir, fileName);
		const fileContent = fs.readFileSync(fullPath, "utf8");

		const matterRes = matter(fileContent);
		return {
			id,
			...matterRes.data
		}
	});
	return postsData.sort((a, b) => {
		if (a.date < b.date)
			return 1;
		else
			return -1;
	});
}

export function getPostsId() {
	const fileNames = fs.readdirSync(postsDir);

	return fileNames
	.filter(fileName => !fileName.startsWith("."))
	.map(fileName => {
		return {
			params: {
				id: fileName.replace(/\.md$/, "")
			}
		}
	});
}

export function getPostData(id) {
	const fullPath = path.join(postsDir, `${id}.md`);
	const fileContent = fs.readFileSync(fullPath, "utf8");

	const matterRes = matter(fileContent);

	return {
		id,
		...matterRes.data,
		content: matterRes.content,
	};
}
