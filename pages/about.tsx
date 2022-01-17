import React from 'react'
import Image from 'next/image'
import Head from 'next/head'
import { NextPage } from 'next'
import { Container } from '../components/container/container'
import { translate, Translator, useTranslate } from '../components/translator/Translator'
import styles from '../styles/about.module.scss'

import { technologies } from '../data/technologies'

import Heading from '../components/heading'
import CallToAction from '../components/CallToAction'

const About: NextPage = () => {
    const aboutLanguageSection = 'about'

    return (
        <React.Fragment>
            <Head>
                <title>{translate('fr', 'title', 'about')}</title>
                <meta
                    name="description"
                    content={translate('fr', 'meta_description', 'about')}
                />
                <meta name="robots" content="index, follow" />
                <link
                    rel="canonical"
                    href={`https://aurelienbrabant.fr/about`}
                />

                <meta property="og:url" content="https://aurelienbrabant.fr/about" />
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content={translate('fr', 'title', 'about')}
                />
                <meta
                    property="og:description"
                    content={translate('fr', 'meta_description', 'about')}
                />
                <meta property="og:image" content="/og-landing.webp" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content="aurelienbrabant.fr" />
                <meta
                    property="twitter:url"
                    content="https://aurelienbrabant.fr/about"
                />
                <meta
                    name="twitter:title"
                    content={translate('fr', 'title', 'about')}
                />
                <meta
                    name="twitter:description"
                    content={translate('fr', 'meta_description', 'about')}
                />
                <meta name="twitter:image" content="/og-landing.webp" />
            </Head>

            <Heading title="about" />
            <main className={styles.aboutMain}>
                <Container className={styles.aboutMainContainer} size="md">
                    <div className={styles.cosmeticWindowButtons}>
                        <span />
                        <span />
                        <span />
                    </div>
                    <Container size="lg">
                        <div className={styles.aboutContentWrapper}>
                            <div className={styles.textImage}>
                                <p>
                                    <Translator section={aboutLanguageSection}>
                                        p1
                                    </Translator>{' '}
                                    <Translator section={aboutLanguageSection}>
                                        p2
                                    </Translator>
                                </p>
                                <div className={styles.imageWrapper}>
                                    <Image
                                        alt={`picture of Aurelien`}
                                        className={styles.image}
                                        src={'/large_abrabant.jpg'}
                                        width={300}
                                        height={300}
                                    />
                                </div>
                            </div>
                            <p>
                                <Translator section={aboutLanguageSection}>
                                    p3
                                </Translator>
                            </p>
                            <p>
                                <Translator section={aboutLanguageSection}>
                                    p4
                                </Translator>
                            </p>
                            <section className={styles.technologiesSection}>
                                <div>
                                    <div className={styles.technologies}>
                                        <h5>technos</h5>
                                        {technologies.map((techno) => (
                                            <div key={techno.name}>
                                                <Image
                                                    alt={techno.name}
                                                    src={techno.imageUrl}
                                                    height={50}
                                                    width={50}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <p>
                                    <Translator section={aboutLanguageSection}>
                                        p5
                                    </Translator>
                                </p>
                            </section>
                            <p>
                                <Translator section={aboutLanguageSection}>
                                    p6
                                </Translator>
                            </p>
                            <p>
                                <Translator section={aboutLanguageSection}>
                                    p7
                                </Translator>
                            </p>

                            <CallToAction
                                href="/#contact"
                                className={styles.cta}
                            >
                                <Translator section={aboutLanguageSection}>
                                    cta
                                </Translator>
                            </CallToAction>
                        </div>
                    </Container>
                </Container>
            </main>
        </React.Fragment>
    )
}

export default About
