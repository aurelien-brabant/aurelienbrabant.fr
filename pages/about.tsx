import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "../components/container/container";
import styles from "../styles/About.module.css";
import aurelienPhoto from "../public/aurelien_nid_aigle.jpg";

const About: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title> About | Aurelien Brabant </title>
        <meta
          name="description"
          content="My name is Aurélien, I'm a web developer. Need your own website done right? Let's get in touch!"
        />
        <meta name="robots" content="index, follow" />
      </Head>
      <Container
        className={styles.aboutWrapper}
        fillPageHeight={true}
        limitedWidth={false}
      >
        <Container className={styles.aboutContainer}>
          <h1> About </h1>
          <img
            src={"/aurelien_nid_aigle.jpg"}
            alt={"photo of Aurélien Brabant"}
            className={styles.photo}
          />
          <p>
            Hi, my name is Aurélien. I'm a french student currently studying
            software engineering at school 42 in Paris.
          </p>
          <p>
            If you haven't heard about the 42 network already, it's basically a
            network of campuses all around the world that aim to train the
            future of software engineers, using a very unique pedagogical
            approach based on peer-learning. If you're interested in 42, I
            highly encourage you to visit{" "}
            <a href="https://42.fr" target="_blank" rel="noreferrer">
              their website
            </a>{" "}
            !
          </p>
          <p>
            I started programming about one year before I decided to attempt the
            selection of 42 Paris which took place in August of 2020. Since
            then, I basically never stopped, growing my skills and mindset,
            enjoying programming as a hobby, but also as a full-time activity.
          </p>

          <p>
            About programming in general, I'm mostly studying fundamentals at
            42, making use of mainly C, C++ and even assembly. Nonetheless, I'm
            also really interested in web development, especially in TypeScript
            and NodeJS, which this website is made out of!
          </p>

          <p>
            Moreover, I enjoy quite a lot the GNU/Linux ecosystem, and love
            hearing about open source software: I'm indeed using Linux as my
            daily driver since almost the beginning of my programming journey!
          </p>

          <p>
            In my spare time, I occasionaly write articles for my{" "}
            <Link href="/blog">
              <a>blog</a>
            </Link>{" "}
            or make{" "}
            <a
              href="https://www.youtube.com/channel/UC9JjIHlcttAz6QJTVjVxsdg"
              target="_blank"
              rel="noreferrer"
            >
              YouTube videos{" "}
            </a>
            with the hope that my knowledge may become useful to others.
          </p>

          <p>
            My so-called life plan is to continue working on software
            engineering projects, while traveling the world (the dream of every
            software engineer, yes I know!)
          </p>

          <p>
            A suggestion, question, offer? Feel free to{" "}
            <Link href="/contact">
              <a>contact me</a>
            </Link>{" "}
            at any time!
          </p>
        </Container>
      </Container>
    </React.Fragment>
  );
};

export default About;
