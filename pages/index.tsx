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

			<Container
				limitedWidth={false}
			>
				<BackgroundImage src={landingBackground} backgroundColor={"rgba(20, 20, 20, .92)"} />
				<Container className={styles.mainContainer}>
					<Image
						src={aurelienPhoto}
						alt={'Photo of Aurelien'}
						height={250}
						width={250}
						className={styles.aurelienPhoto}
					/>

					<div className={styles.introduction}>
						<h1 className={styles.introduction}>
							<Translator section={languageSection}>
								name
							</Translator>
						</h1>

						<h3>
							<Translator section={languageSection}>
								short introduction
							</Translator>
						</h3>

						<p className={styles.activity}>
							<Translator
								manual={{
									en: (
										<Fragment>
											I'm currently learning programming
											at{' '}
											<ExternalLink href="https://42.fr">
												<b className="bold">42 Paris</b>
											</ExternalLink>
											, where I mainly concentrate on C
											and C++ programming. I'm also
											building blazing fast, modern and
											reliable websites using{' '}
											<b className="bold">NodeJS</b> and{' '}
											<b className="bold">Typescript</b>
										</Fragment>
									),

									fr: (
										<Fragment>
											Je suis actuellement étudiant à {" "}
											<ExternalLink href="https://42.fr">
												l &#39; école 42
											</ExternalLink>{' '}
											sur le campus de Paris où j'étudie
											la programmation, faisant
											principalement du C et du C++. Je
											réalise aussi des sites web rapides
											modernes et fiables à l'aide de{' '}
											<b className="bold">NodeJS</b> et de{' '}
											<b className="bold">Typescript</b>🚀
										</Fragment>
									),
								}}
							/>
						</p>
						<SocialNetworks className={styles.socials} />
					</div>
				</Container>

				<div className={styles.introductionCurve}>
					<svg
						data-name="Layer 2"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 1200 120"
						preserveAspectRatio="none"
					>
						<path
							d="M322.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
							className={styles.shapeFill}
						></path>
					</svg>
				</div>
			</Container>

			{/* TECHNOLOGIES */}

			<Container
				className={styles.backgroundTechnologies}
				limitedWidth={false}
				edgePadded={false}
			>
				<Container className={styles.technologiesContainer}>
					<h2 className={styles.rotatedTitle}>
						<Translator section={languageSection}>
							technologies heading
						</Translator>
					</h2>
					<h3>
						<Translator section={languageSection}>
							technologies sub
						</Translator>
					</h3>
					<div className={styles.technologies}>
						{technologies
							.filter(
								(technology) =>
									!excludedTechnologies.includes(
										technology.name.toLowerCase()
									)
							)
							.map((technology) => (
								<div key={technology.name}>
									<img
										alt={technology.name}
										src={technology.imageUrl}
									/>
								</div>
							))}
					</div>
					<div className={styles.cta}>
						<h3>
							<Translator section={languageSection}>
								technologies get in touch
							</Translator>
						</h3>
						<Link href="/contact">
							<a>
								<Translator section={languageSection}>
									technologies get in touch btn
								</Translator>
							</a>
						</Link>
					</div>
				</Container>
			</Container>

			<Container
				limitedWidth={false}
				className={styles.blogSection}
			>
				<BackgroundImage src={landingBlog} objectFit={"contain"} backgroundColor={"rgba(20, 20, 20, .90)"} />
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
		</React.Fragment>
	)
}

export default Home
