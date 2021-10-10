import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostMeta = {
	id: string;
	title: string;
	preview: string;
	dateString: string;
	author: string;
	tags?: string[];
};

export type BlogPost = {
	id: string;
	content: string;
	meta: PostMeta;
};

const POSTS_DIR = path.join(process.cwd(), "posts");

export const getPosts = (): BlogPost[] => {
	const fileNames = fs.readdirSync(POSTS_DIR);

	return fileNames
		.filter((fileName) => !fileName.startsWith("."))
		.map((fileName) => getPost(fileName.replace(/\.md$/, ''))).sort((a, b) => {
			if (new Date(a.meta.dateString) < new Date(b.meta.dateString)) {
				return 1;
			} else {
				return -1;
			}
		});
};

export const getPost = (id: string): BlogPost => {
	const rawContent = fs.readFileSync(path.join(POSTS_DIR, `${id}.md`));
	const matterRes = matter(rawContent);

	if (
		matterRes.data.title &&
		matterRes.data.preview &&
		matterRes.data.dateString &&
		matterRes.data.author
	) {
		return {
			id,
			content: matterRes.content,
			meta: matterRes.data as PostMeta,
		};
	} else {
		throw Error(
			`${id}.md is not a valid post: missing mandatory metadata`
		);
	}
};

/**
 * Get a list of all the used post tags, as an array of string
 */

export const getPostsTag = (): string[] => {
	const tags: string[] = [];

	getPosts().forEach((post) => {
		if (post.meta.tags !== undefined) {
			for (const tag of post.meta.tags) {
				if (!tags.includes(tag)) {
					tags.push(tag);
				}
			}
		}
	});

	return tags;
};
