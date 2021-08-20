import React from 'react';
import Image from 'next/image';
import {Container} from '../components/container/container';

import styles from '../styles/soon.module.css';

const Soon: React.FC<{}> = () =>
{
  return (
    <Container
      fillPageHeight={true}
      className={styles.mainContainer}
    >
      <h1> Sorry but... </h1>
      <Image src='/coming_soon.png' width={1000} height={320} />
      <h2> This page is still under construction! </h2>
    </Container>
  )
}

export default Soon;
