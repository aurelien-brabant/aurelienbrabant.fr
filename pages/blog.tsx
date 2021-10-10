import React, { useState, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "../components/container/container";
import styles from "../styles/Blog.module.css";
import { getPosts, BlogPost, getPostsTag } from "../lib/posts";
import { readtimeInMinutes } from "../lib/readtime";
import { useMediaQuery } from "react-responsive";

import { Translator } from '../components/translator/Translator';

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

const Blog: React.FC<{ posts: BlogPost[]; postTags: string[] }> = ({
  posts,
  postTags,
}) => {
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(posts);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const blogLanguageSection = "blog";

  const isLargeEnoughForHorizontalPosts = useMediaQuery({
    query: "(min-width: 1250px)",
  });

  const selectTag = (tag: string) => {
    if (tag === selectedTag) {
      setSelectedTag(null);
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter((post) => post.meta.tags!.includes(tag)));
      setSelectedTag(tag);
    }
  };

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
            <img
              src={`/blog/covers/${post.id}.png`}
              alt={`${post.id}'s cover image`}
            />
          </a>
        </Link>
        <div className={styles.content}>
          <div className={styles.postTags}>
            {post.meta.tags &&
              post.meta.tags.map((tag) => (
                <span
                  key={`${post.id}-${tag}`}
                  className={`${styles.previewTag} ${
                    selectedTag === tag ? styles.selected : ""
                  }`}
                >
                  {" "}
                  {tag}
                </span>
              ))}
          </div>
          <div>
            <h3>
              <Link href={`/blog/${post.id}`}>
                <a> {post.meta.title}</a>
              </Link>
            </h3>
            <p>
              <Link href={`/blog/${post.id}`}>
                <a>{post.meta.preview}</a>
              </Link>
            </p>
            <div className={styles.metablock}>
              <Image
                src={"/aurelien.jpg"}
                alt={"photo of the author"}
                width={40}
                height={40}
                className={styles.authorImage}
              />
              <div>
                <div style={{ marginBottom: "5px" }}> Aurelien Brabant </div>
                <div>
                  {" "}
                  {new Date(post.meta.dateString).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  • {readtimeInMinutes(post.content)} MINUTES READ
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  };

  const renderPreviews = () => {
    const previews: React.ReactNode[] = [];

    for (let i = 0; i < filteredPosts.length;) {
      if (!isLargeEnoughForHorizontalPosts || i % 4) {
        let els: BlogPost[] = [];

        if (!isLargeEnoughForHorizontalPosts) els = filteredPosts;
        else
          els = filteredPosts.slice(
            i,
            i + (i + 3 >= filteredPosts.length ? filteredPosts.length - i : 3)
          );

        previews.push(
          <div className={styles.blogpostsInline} key={`grouped-${i}`}>
            {els.map((el) => (
              <BlogPostPreview key={el.id} post={el} vertical={true} />
            ))}
          </div>
        );
        i += els.length;
      } else {
        previews.push(
          <Fragment key={filteredPosts[i].id}>
            <BlogPostPreview post={filteredPosts[i]} vertical={false} />
            <hr className={styles.blogpostSeparator} />
          </Fragment>
        );
        ++i;
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
          <h1><Translator section={blogLanguageSection}>heading</Translator></h1>
          <h2><Translator section={blogLanguageSection}>sub heading</Translator></h2>
          <div className={styles.tagList}>
            {postTags.map((tag) => (
              <span
                key={tag}
                className={`${styles.tag} ${
                  selectedTag === tag ? styles.selected : ""
                }`}
                onClick={() => selectTag(tag)}
              >
                {tag}
              </span>
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
