import React, {ChangeEvent, ChangeEventHandler, KeyboardEventHandler, useEffect, useState} from 'react';
import {Card} from '../components/card/card';
import {Container} from '../components/container/container';
import styles from '../styles/Blog.module.css';
import { getPostsMeta } from '../lib/posts';
import Flip from 'react-reveal/Flip';

export async function getStaticProps() {
  const posts = getPostsMeta();
  return {
    props: {
      posts
    }
  }
}

interface PostMeta
{
  id: string;
  title: string;
  preview: string;
  date: string;
}

const Blog: React.FC<{ posts: PostMeta[] }> = ({ posts }) =>
{
  const [ filteredPosts, setFilteredPosts ] = useState<PostMeta []>([]);
  const [ sanePosts, setSanePosts ] = useState<PostMeta[]>([]);

  useEffect(() => {
    setSanePosts(posts.map((post) => {
      return {
        ...post,
        preview: post.preview.toLowerCase(),
        title: post.preview.toLowerCase(),
      }
    }))
    setFilteredPosts(posts);
  }, []);

  const handleSearch = (ev: ChangeEvent<HTMLInputElement>, sanePosts: PostMeta[]) => {
    const saneSearchTerm = ev.target.value.toLowerCase();

    setFilteredPosts(posts.filter((post, i) => {
      return sanePosts[i].title.includes(saneSearchTerm) || sanePosts[i].preview.includes(saneSearchTerm);
    }))
  }

  return (
    <Container
      className={styles.mainContainer}
      fillPageHeight={true}
    >
      <h2 className={styles.title}> Let's have a talk. </h2>
      <input
        className={styles.searchbar}
        type='text'
        placeholder="Search for something..."
        onChange={(ev) => { handleSearch(ev, sanePosts) }}
      />
      <div
        className={styles.articleCards}
      >
        { filteredPosts.length === 0 && <h3>Sorry, did not found anything :( </h3> }
        { filteredPosts.map((post) => (
          <Card
            key={post.id}
            cardClassName={styles.blogpostCard}
            imageCoverUrl={`/blog/covers/${post.id}.png`}
            title={post.title}
            subtitle={post.date}
            description={post.preview}
            onClickUrl={`/blog/${post.id}`}
          />
        ))}
      </div>
    </Container>
  );
}

export default Blog;
