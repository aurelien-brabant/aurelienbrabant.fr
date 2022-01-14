import React from 'react'
import Image from 'next/image'
import Head from 'next/head'
import { NextPage } from 'next'
import Link from 'next/link'
import { Container } from '../components/container/container'
import { Translator } from '../components/translator/Translator'
import styles from '../styles/about.module.scss'
import ExternalLink from '../components/external-link/ExternalLink'

import { technologies } from '../data/technologies'

import aurelienNidAigle from '../public/aurelien_nid_aigle.webp'
import Heading from '../components/heading'

const About: NextPage = () => {
    const aboutLanguageSection = 'about'

    return (
        <React.Fragment>
            <Head>
                <title> About | Aurelien Brabant </title>
                <meta
                    name="description"
                    content="My name is Aurélien, I'm a web developer. Need your own website done right? Let's get in touch!"
                />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://aurelienbrabant.fr/about" />
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
                                <Translator section={aboutLanguageSection}>p6</Translator>
                            </p>
<p>
                                <Translator section={aboutLanguageSection}>p7</Translator>
                            </p>

                            <Link href="/contact"><a className={styles.cta}><Translator section={aboutLanguageSection}>cta</Translator></a></Link>
                        </div>
                    </Container>
                </Container>
            </main>
        </React.Fragment>
    )
}

export default About
