const Feed = require('feed').Feed;
const getBlogpostMeta = require('./getBlogpostMeta');
const fs = require('fs');


const feed = new Feed({
    title: "Aurelien Brabant's Blog feed",
    description: "Feed that lists all my blogposts",
    id: "https://aurelienbrabantfr/blog",
    link: "https://aurelienbrabant.fr",
    language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    //image: "http://example.com/image.png",
    favicon: "https://aurelienbrabant.fr/favicon.ico",
    copyright: "All rights reserved 2021, Aurelien Brabant",
    author: {
        name: "Aurelien Brabant",
        email: "hi@aurelienbrabant.fr",
        link: "https://aurelienbrabant.fr"
    }
});

getBlogpostMeta().forEach((postMeta) => {
    feed.addItem({
        title: postMeta.meta.title,
        id: postMeta.id,
        link: `https://aurelienbrabant.fr/blog/${postMeta.id}`,
        description: postMeta.meta.preview,
        date: new Date(postMeta.meta.dateString),
        content: postMeta.content
    })
});

try {
    fs.mkdirSync('public/feeds');
} catch (e) { }

fs.writeFileSync("public/feeds/blog.xml", feed.rss2());