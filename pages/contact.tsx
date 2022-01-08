import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { Container } from "../components/container/container";
import { Translator } from "../components/translator/Translator";
import SocialNetworks from "../components/social-networks/SocialNetworks";

import styles from "../styles/contact.module.scss";

const ContactPage: NextPage = () => {
  const contactLanguageSection = "contact";

  return (
    <React.Fragment>
      <Head>
        <title>Contact | Aurelien Brabant</title>
        <link rel="canonical" href="https://aurelienbrabant.fr/contact" />
        <meta name="robots" content="index, follow" />
        <meta
          name="description"
          content="My name is Aurélien, I'm a web developer. Need your own website done right? Let's get in touch!"
        />
      </Head>
      <Container
        limitedWidth={false}
        className={styles.contactWrapper}
        fillPageHeight={true}
      >
       <Container className={styles.contactContainer}>
            <h1>
            {" "}
            <span>~</span><Translator section={contactLanguageSection}>heading</Translator><span>~</span>
          </h1>
          <p>
            <Translator section={contactLanguageSection}>thank you</Translator>
          </p>

          <p>
            <Translator section={contactLanguageSection}>
              description
            </Translator>
          </p>

          <p>
            <b>
              <Translator section={contactLanguageSection}>
                best way to reach
              </Translator>
              <a href="mailto:contact@aurelienbrabant.fr" className={styles.email}>
                {" "}
                contact@aurelienbrabant.fr.
              </a>
            </b>
          </p>

          <p>
            <Translator section={contactLanguageSection}>socials</Translator>
          </p>
          <SocialNetworks className={styles.socials} />
        </Container>
      </Container>
    </React.Fragment>
  );
};

export default ContactPage;
