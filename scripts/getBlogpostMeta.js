const path = require('path');
const fs = require('fs');
const matter = require('gray-matter');

const POSTS_DIR = path.join(process.cwd(), "posts");

module.exports = () => {
    const fileNames = fs.readdirSync(POSTS_DIR);

    return fileNames
        .filter((fileName) => !fileName.startsWith(".") && fileName.endsWith('.md'))
        .map((fileName) => {
            const rawContent = fs.readFileSync(path.join(POSTS_DIR, fileName));
            const matterRes = matter(rawContent);

            return {
                id: fileName.replace(/.md$/, ''),
                meta: matterRes.data,
                content: matterRes.content
            }
        });
}