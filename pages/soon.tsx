import React from 'react';
import Image from 'next/image';
import {Container} from '../components/container/container';
import Head from 'next/head';
import styles from '../styles/soon.module.css';

const Soon: React.FC<{}> = () =>
{
  return (
    <React.Fragment>
      <Head>
        <title>Coming soon | Aurelien Brabant</title>
        <meta name="description" content="Sorry, this page is not available yet, but it will be soon!" />
        { /* We definitely do not want to index that page */ }
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Container
        fillPageHeight={true}
        className={styles.mainContainer}
      >
        <h1> Sorry but... </h1>
        <Image src='/coming_soon.png' width={1000} height={320} alt={'Soon image'} />
        <h2> This page is still under construction! </h2>
      </Container>
    </React.Fragment>
  )
}

export default Soon;
