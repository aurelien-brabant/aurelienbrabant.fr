import type { NextPage } from 'next'
import React, { Fragment } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Container } from '../components/container/container'
import ExternalLink from '../components/external-link/ExternalLink'
import SocialNetworks from '../components/social-networks/SocialNetworks'
import { Translator } from '../components/translator/Translator'
import Link from 'next/link'
import { technologies } from '../data/technologies'
import styles from '../styles/index.module.scss'
import { useMediaQuery } from 'react-responsive'
import BackgroundImage from '../components/BackgroundImage'

import { AiOutlineArrowRight } from 'react-icons/ai';

import aurelienPhoto from '../public/aurelien.webp'
import landingBackground from '../public/landing_bg.webp'
import landingBlog from '../public/landing_blog.webp'

/*
 ** Technologies identified by these names will not be displayed in the technologies.
 ** Names are expected to be lowercase.
 */

const excludedTechnologies = ['nasm', 'wordpress']

const Home: NextPage = () => {
	const languageSection = 'index'

	const isPhone = useMediaQuery({
		query: '(max-width: 600px)',
	})

	return (
		<React.Fragment>
			<Head>
				<title>Web developer | Aurélien Brabant</title>
				<meta
					name="description"
					content="My name is Aurélien, I'm a web developer. Need your own website done right? Let's get in touch!"
				/>
				<meta name="robots" content="index, follow" />
				<link rel="canonical" href={`https://aurelienbrabant.fr`} />
			</Head>

			{/* Introduction - Landing page */}

			<Container limitedWidth={false} className={styles.rootContainer}>
				<Container className={styles.mainContainer}>
					<Image
						src={aurelienPhoto}
						alt={'Photo of Aurelien'}
						height={220}
						width={220}
						className={styles.aurelienPhoto}
					/>

					<div className={styles.introduction}>
						<h1 className={styles.introduction}>
							<Translator section={languageSection}>
								name
							</Translator>
							<span className={styles.period}>.</span>
						</h1>

						<h3>
							<Translator section={languageSection}>
								short introduction
							</Translator>
						</h3>
						<div className={styles.ctas}>
							<Link href="/contact"><a className={styles.hiremeCta}><span>Hire me</span></a></Link>
							<Link href="/projects"><a className={styles.projectsCta}><span><AiOutlineArrowRight /><span>See my projects</span></span></a></Link>
						</div>
					</div>
				</Container>

						</Container>

			{/* TECHNOLOGIES */}

			{/*
						<Container limitedWidth={false} className={styles.blogSection}>
				<Container className={styles.textCtaSection}>
					<h2 className={styles.title}>
						<Translator section={languageSection}>
							blog heading
						</Translator>
					</h2>

					<p>
						<Translator section={languageSection}>
							blog sub
						</Translator>
					</p>

					<Link href="/blog">
						<a className={styles.ctaButton}>
							<Translator section={languageSection}>
								blog btn
							</Translator>
						</a>
					</Link>
				</Container>
			</Container>
			  */}
		</React.Fragment>
	)
}

export default Home
