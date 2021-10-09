import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import Link from "next/link";
import { Container } from "../components/container/container";
import { Translator } from "../components/translator/Translator";
import styles from "../styles/About.module.css";
import ExternalLink from "../components/external-link/ExternalLink";

const About: NextPage = () => {
  const aboutLanguageSection = "about";

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
          <h1>
            {" "}
            <Translator section={aboutLanguageSection}>heading</Translator>
          </h1>
          <img
            src="/aurelien_nid_aigle.jpg"
            alt={"photo of Aurélien Brabant"}
            className={styles.photo}
          />
          <p>
            <Translator section={aboutLanguageSection}>p1</Translator>
          </p>
          <p>
            <Translator section={aboutLanguageSection}>p2</Translator>
          </p>
          <p>
            <Translator section={aboutLanguageSection}>p3</Translator>
          </p>

          <p>
            <Translator section={aboutLanguageSection}>p4</Translator>
          </p>

          <p>
            <Translator section={aboutLanguageSection}>p5</Translator>
          </p>

          <p>
            <Translator
              manual={{
                en: (
                  <React.Fragment>
                    In my spare time, I occasionaly write articles for my{" "}
                    <Link href="/blog">
                      <a>blog</a>
                    </Link>{" "}
                    or make{" "}
                    <ExternalLink href="https://www.youtube.com/channel/UC9JjIHlcttAz6QJTVjVxsdg">
                      YouTube videos{" "}
                    </ExternalLink>
                    with the hope that my knowledge may become useful to others.
                  </React.Fragment>
                ),
                fr: (
                  <React.Fragment>
                    Sur mon temps libre, je m'adonne à l'écriture d'articles sur
                    mon{" "}
                    <Link href="/blog">
                      <a>blog</a>
                    </Link>{" "}
                    ou enregistre des{" "}
                    <ExternalLink href="https://www.youtube.com/channel/UC9JjIHlcttAz6QJTVjVxsdg">
                      vidéos YouTube{" "}
                    </ExternalLink>
                    avec l'espoir que mes connaissances puissent se réveler
                    utile aux autres.
                  </React.Fragment>
                ),
              }}
            />
          </p>

          <p>
            <Translator section={aboutLanguageSection}>p6</Translator>
          </p>

          <p>
            <Translator
              manual={{
                en: (
                  <React.Fragment>
                    A suggestion, question, offer? Feel free to{" "}
                    <Link href="/contact">
                      <a>contact me</a>
                    </Link>{" "}
                    at any time!
                  </React.Fragment>
                ),
                fr: (
                  <React.Fragment>
                    Une suggestion, une question, une offre?{" "}
                    <Link href="/contact">
                      <a>Contactez moi </a>
                    </Link>{" "}
                    dès maintenant!
                  </React.Fragment>
                ),
              }}
            />
          </p>
        </Container>
      </Container>
    </React.Fragment>
  );
};

export default About;
