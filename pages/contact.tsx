import React from "react";
import { NextPage } from "next";
import { Container } from "../components/container/container";

import styles from "../styles/Contact.module.css";

const ContactPage: NextPage = () => {
  return (
    <Container limitedWidth={false} className={styles.contactWrapper}
        fillPageHeight={true}
    >
      <Container className={styles.contactContainer}
      >
        <h1>Contact</h1>
        <p>Thank you for your interest in getting in touch!</p>

        <p>
          Whether it's to discuss about stuff I've written on my blog or to work
          with me, I'm happy to get your email.
        </p>

        <p>
          <b>
            The best way to reach me is by email at
            <a href="mailto:hi@aurelienbrabant.fr" className={styles.email}>
              {" "}
              hi@aurelienbrabant.fr.
            </a>
          </b>
        </p>

        <p>
          You can also visit my {" "}
          <a href="https://github.com/aurelien-brabant" target="_blank" rel="noreferrer">GitHub</a>,{" "}
          <a href="https://www.linkedin.com/in/aurelien-brabant" target="_blank" rel="noreferrer">LinkedIn</a>,{" "}
          <a href="https://twitter.com/aurelienb42" target="_blank" rel="noreferrer">Twitter</a>,{" "}
          or even <a href="https://www.youtube.com/channel/UC9JjIHlcttAz6QJTVjVxsdg" target="_blank" rel="noreferrer">YouTube</a> channel.
        </p>
      </Container>
    </Container>
  );
};

export default ContactPage;
