const fs = require("fs");
const projects = require('../data/projects.cjs');

const basename = (s) => {
	const split = s.split('/');

	return split[split.length - 1];
}

module.exports = () => {
	const excludedPageNames = [
		'soon',
		'blog/[id]',
		'projects/[id]'
	];

	const fileObj = {};

	const getPostPaths = () => {
		const files = fs.readdirSync("posts/");
		files.forEach(file => {
			const filePath = `posts/${file}`;
			const fileStat = fs.statSync(filePath);
			
			/* remove the .md extension from the filepath */
			const cleanFilePath = basename(filePath).split(".md")[0];

			fileObj[`/blog/${cleanFilePath}`] = {
				page: `/blog/${cleanFilePath}`,
				lastModified: fileStat.mtime
			};
		})
	}

	const getProjectsPaths = () => {
		const fileStat = './data/projects.cjs';
		for (const project of projects) {
			fileObj[`/projects/${project.id}`] = {
				page: `/projects/${project.id}`,
				lastModified: fileStat.mtime
			};
		}
	}

	const walkSync = dir => {
		// Get all files of the current directory & iterate over them
		const files = fs.readdirSync(dir);
		files.forEach(file => {
			// Construct whole file-path & retrieve file's stats
			const filePath = `${dir}${file}`;
			const fileStat = fs.statSync(filePath);

			if (fileStat.isDirectory()) {
				// Recurse one folder deeper
				walkSync(`${filePath}/`);
			} else {
				// Construct this file's pathname excluding the "pages" folder & its extension
				const cleanFileName = filePath
					.substr(0, filePath.lastIndexOf("."))
					.replace("pages/", "");
				
				if (excludedPageNames.includes(cleanFileName)) return ;

				// Add this file to `fileObj`
				fileObj[`/${cleanFileName}`] = {
					page: `/${cleanFileName}`,
					lastModified: fileStat.mtime
				};
			}
		});
	};

	// Start recursion to fill `fileObj`
	walkSync("pages/");

	getPostPaths();

	getProjectsPaths();

	return fileObj;
};

