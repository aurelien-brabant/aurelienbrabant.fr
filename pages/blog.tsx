import React, { ChangeEvent, useEffect, useState, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "../components/card/card";
import { Container } from "../components/container/container";
import styles from "../styles/Blog.module.css";
import { getPosts, BlogPost, getPostsTag } from "../lib/posts";
import { readtimeInMinutes } from '../lib/readtime';
import { useMediaQuery } from 'react-responsive';

import Head from "next/head";

export async function getStaticProps() {
  const posts = getPosts();
  const tags = getPostsTag();
  return {
    props: {
      posts,
      postTags: tags,
    },
  };
}

const BlogPostPreview: React.FC<{
  post: BlogPost;
  vertical: boolean;
}> = ({ post, vertical }) => {


  return (
    <article
      className={`${styles.blogpostPreviewWrapper}
      ${vertical ? styles.vertical : ""}
      `}
    >
      <Link href={`/blog/${post.id}`}>
        <a>
          <img src={`/blog/covers/${post.id}.png`} />
        </a>
      </Link>
      <div className={styles.content}>
        <div className={styles.postTags}>
          {post.meta.tags && post.meta.tags.map((tag) => <span> {tag} </span>)}
        </div>
        <div>
          <h3>
            <Link href={`/blog/${post.id}`}>
             <a> {post.meta.title}</a>
            </Link>
          </h3>
          <p><Link href={`/blog/${post.id}`}><a>{post.meta.preview}</a></Link></p>
          <div className={styles.metablock}>
            <Image
              src={"/aurelien.jpg"}
              alt={"photo of the author"}
              width={40}
              height={40}
              className={styles.authorImage}
            />
            <div>
              <div style={{marginBottom: '5px'}}> Aurelien Brabant </div>
              <div> { new Date(post.meta.dateString).toLocaleString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
              }) } • { readtimeInMinutes(post.content) } MINUTES READ
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

const Blog: React.FC<{ posts: BlogPost[]; postTags: string[] }> = ({
  posts,
  postTags,
}) => {
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [sanePosts, setSanePosts] = useState<BlogPost[]>([]);

  const isLargeEnoughForHorizontalPosts = useMediaQuery({ query: '(min-width: 1250px)' });

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

  const renderPreviews = () => {
    const previews: React.ReactNode[] = [];

    for (let i = 0; i < posts.length; ++i) {
      if (!isLargeEnoughForHorizontalPosts || i % 4) {
        let els: BlogPost[] = [];

        if (!isLargeEnoughForHorizontalPosts) els = posts;
        else els = posts.slice(i, i + (i + 3 >= posts.length ? posts.length : 3));

        previews.push(
          <div className={styles.blogpostsInline} key={`grouped-${i}`}>
            {els.map((el) => (
              <BlogPostPreview post={el} vertical={true} />
            ))}
          </div>
        );
        i += els.length;
      } else {
        previews.push(
          <Fragment key={i}>
            <BlogPostPreview key={i} post={posts[i]} vertical={false} />
            <hr className={styles.blogpostSeparator} />
          </Fragment>
        );
      }
    }

    return previews;
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
      <Container className={styles.blogHeaderWrapper} limitedWidth={false}>
        <Container className={styles.blogHeader}>
          <h1>Blog</h1>
          <h2>Featured articles about programming, hardware and more</h2>
          <div className={styles.tagList}>
            {postTags.map((tag) => (
              <span className={styles.tag}>{tag}</span>
            ))}
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

          {renderPreviews()}
        </Container>
      </Container>
    </React.Fragment>
  );
};

export default Blog;
