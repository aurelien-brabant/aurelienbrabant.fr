import React, { ChangeEvent, useEffect, useState } from "react";
import { Card } from "../components/card/card";
import { Container } from "../components/container/container";
import styles from "../styles/Blog.module.css";
import { getPosts, BlogPost } from "../lib/posts";

import Head from "next/head";

export async function getStaticProps() {
  const posts = getPosts();
  return {
    props: {
      posts,
    },
  };
}

const Blog: React.FC<{ posts: BlogPost[] }> = ({ posts }) => {
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
      <Container className={styles.mainContainer} fillPageHeight={true}>
        <h2 className={styles.title}> {"Let's have a talk."} </h2>
        <input
          className={styles.searchbar}
          type="text"
          placeholder="Search for something..."
          onChange={(ev) => {
            handleSearch(ev, sanePosts);
          }}
        />
        <div className={styles.articleCards}>
          {filteredPosts.length === 0 && (
            <h3>Sorry, did not found anything :( </h3>
          )}
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              cardClassName={styles.blogpostCard}
              imageCoverUrl={`/blog/covers/${post.id}.png`}
              title={post.meta.title}
              subtitle={post.meta.dateString}
              description={post.meta.preview}
              onClickUrl={`/blog/${post.id}`}
            />
          ))}
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Blog;
