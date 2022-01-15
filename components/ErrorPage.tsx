import React from 'react';
import Head from 'next/head';
import {Container} from '../components/container/container';

import styles from '../styles/error-page.module.scss';
import {useTranslateFromObject, Translator} from './translator/Translator';

type ErrorPageProps = {
    statusCode: number;
    sub: { fr: string, en: string }
};

const ErrorPage: React.FC<ErrorPageProps> = ({ statusCode, sub }) => (
        <React.Fragment>
        <Head>
            <title>Not found | Aurélien Brabant</title>
            <meta name="description" content="Sorry, but this page could not be found" />
        </Head>

        <section className={styles.notfound}>
            <Container className={styles.mainContainer}>
                <h1>{statusCode}</h1>
                <h2>{useTranslateFromObject(sub)}</h2>
                <a href="mailto:contact@aurelienbrabant.fr"><Translator section="error">report_problem</Translator></a>
            </Container>
        </section>

        </React.Fragment>
    )


export default ErrorPage;
