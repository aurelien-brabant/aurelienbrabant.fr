import { Feed } from 'feed'
import { GetServerSideProps } from 'next'

const baseFeedOptions = {
    title: "Aurelien Brabant's Blog feed",
    description: 'Feed that lists all my blogposts',
    id: 'https://aurelienbrabantfr/blog',
    link: 'https://aurelienbrabant.fr',
    language: 'en', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    //image: "http://example.com/image.png",
    favicon: 'https://aurelienbrabant.fr/favicon.ico',
    copyright: 'All rights reserved 2021, Aurelien Brabant',
    author: {
        name: 'Aurelien Brabant',
        email: 'hi@aurelienbrabant.fr',
        link: 'https://aurelienbrabant.fr',
    },
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const fetchRes = await fetch(
        `http://${process.env.API_HOST}:${process.env.API_PORT}/blogposts`
    )

    if (fetchRes.status === 200) {
        const { posts }: { posts: BrabantApi.BlogpostPreview[] } =
            await fetchRes.json()
        const feed = new Feed(baseFeedOptions)

        for (const post of posts) {
            feed.addItem({
                title: post.title,
                id: post.stringId,
                link: `https://aurelienbrabant.fr/blog/${post.stringId}`,
                description: post.description,
                date: new Date(post.lastEditTs),
                published: new Date(post.releaseTs),
                image: post.coverImagePath
            })
        }

        res.setHeader('Content-Type', 'text/xml');
        res.write(feed.rss2());
        res.end();
    }

    return {
        props: {},
    }
}

const BlogRSSFeed = () => {}

export default BlogRSSFeed
