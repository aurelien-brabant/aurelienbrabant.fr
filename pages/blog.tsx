import React from 'react';
import {Card} from '../components/card/card';
import {Container} from '../components/container/container';
import styles from '../styles/Blog.module.css';

const Blog: React.FC<{}> = () =>
{
  return (
      <Container
        className={styles.mainContainer}
        fillPageHeight={true}
      >
        <div
          className={styles.header}
        >
        <h1> Blog </h1>
        <h2> Let's talk together </h2>
        </div>
        <div
          className={styles.articleCards}
        >
          {[1, 1, 1, 1, 1, 1, 1, 1, 1].map(() => (
          <Card
            imageCoverUrl='/blog_bg.jpg'
            title='Article'
            description='This is an awesome article, honestly'
          />
          ))}
        </div>
     </Container>
  );
}

export default Blog;
