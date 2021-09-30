import React, { ChangeEvent, useEffect, useState } from "react";
import Link from 'next/link';
import { Card } from "../components/card/card";
import { Container } from "../components/container/container";
import styles from "../styles/Blog.module.css";
import { getPosts, BlogPost, getPostsTag } from "../lib/posts";

import Head from "next/head";

export async function getStaticProps() {
  const posts = getPosts();
  const tags = getPostsTag();
  return {
    props: {
      posts,
      postTags: tags
    },
  };
}

const BlogPostPreview: React.FC<{
  post: BlogPost,
}> = ({ post }) =>
{
  return (
    <article
      className={styles.blogpostPreviewWrapper}
    >
      <Link href={`/blog/${post.id}`}><a>
        <img src={`/blog/covers/${post.id}.png`} />
      </a></Link>
        <div
          className={styles.content}
        >
          <div
            className={styles.postTags}
          >
            { post.meta.tags && post.meta.tags.map(tag => <span> { tag } </span>) }
          </div>
          <h3> { post.meta.title } </h3>
          <p> { post.meta.preview } </p>
        </div>
    </article>
  );
}

const Blog: React.FC<{ posts: BlogPost[], postTags: string[] }> = ({ posts, postTags }) => {
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [sanePosts, setSanePosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setSanePosts(
      posts.map((post) => {
        return {
          ...post,
          preview: post.meta.preview.toLowerCase(),
          title: post.meta.preview.toLowerCase(),
        };
      })
    );
    setFilteredPosts(posts);
  }, [posts]);

  const handleSearch = (
    ev: ChangeEvent<HTMLInputElement>,
    sanePosts: BlogPost[]
  ) => {
    const saneSearchTerm = ev.target.value.toLowerCase();

    setFilteredPosts(
      posts.filter((post, i) => {
        return (
          sanePosts[i].meta.title.includes(saneSearchTerm) ||
          sanePosts[i].meta.preview.includes(saneSearchTerm)
        );
      })
    );
  };

  return (
    <React.Fragment>
      <Head>
        <title>Blog | Aurelien Brabant</title>
        <meta
          name="description"
          content="Blog posts about web development, the GNU/Linux ecosystem, and computer science in general. Come read my programmer stories!"
        />
        <meta name="robots" content="index, follow" />
      </Head>
        <Container
          className={styles.blogHeaderWrapper}
          limitedWidth={false}
        >
          <Container
            className={styles.blogHeader}
          >
          <h1>Blog</h1>
          <h2>
            Featured articles about programming, hardware and more
          </h2>
          <div className={styles.tagList}>
          { postTags.map(tag => (
            <span className={styles.tag}>
              { tag }
            </span>
          ))
          }
          </div>
          </Container>
        </Container>
      <Container
        className={styles.mainContainer}
        fillPageHeight={true}
        limitedWidth={false}
      >
        <Container>

        {/*
        <h2 className={styles.title}> {"Let's have a talk."} </h2>
        <input
          className={styles.searchbar}
          type="text"
          placeholder="Search for something..."
          onChange={(ev) => {
            handleSearch(ev, sanePosts);
          }}
        />
          */}

          { posts.map(post => (
            <BlogPostPreview
            post={post}
            />
          ))
          }

        </Container>
      </Container>
    </React.Fragment>
  );
};

export default Blog;
