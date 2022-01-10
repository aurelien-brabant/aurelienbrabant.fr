import type { NextPage } from 'next'
import React, { Fragment, ReactElement } from 'react'
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

import { AiOutlineArrowRight } from 'react-icons/ai'
import { MdDesktopMac } from 'react-icons/md'
import { RiMacbookLine } from 'react-icons/ri'

import aurelienPhoto from '../public/aurelien.webp'
import landingBackground from '../public/landing_bg.webp'
import landingBlog from '../public/landing_blog.webp'

import { BsCodeSquare } from 'react-icons/bs'
import { CgFileDocument } from 'react-icons/cg'
import { IoMdChatbubbles } from 'react-icons/io'

import landingServices, { LandingService } from '../data/landing_services'

const Priority: React.FC<{ title: string; icon: ReactElement }> = ({
	title,
	icon,
	children,
}) => (
	<article className={styles.priority}>
		<div className={styles.divider} />
		<div className={styles.iconWrapper}>
			<div className={styles.iconBox}>{icon}</div>
		</div>
		<div className={styles.text}>
			<h4> {title} </h4>
			<p> {children} </p>
		</div>
	</article>
)

const ServicePresenter: React.FC<{
	service: LandingService
	direction: 'left' | 'right'
}> = ({ service, direction }) => (
	<article
		key={service.name}
		className={`${styles.serviceItem} ${styles[direction]}`}
		style={{
			backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.90), rgba(0, 0, 0, 0.90)),
		url('${service.bgURI}')`,
		}}
	>
		{direction === 'left' && (
			<div className={styles.logo}>{service.icon}</div>
		)}
		<div className={styles.description}>
			<h4 className={styles.title}>{service.name}</h4>
			<p className={styles.description}>{service.description}</p>
		</div>
		{direction == 'right' && (
			<div className={styles.logo}>{service.icon}</div>
		)}
	</article>
)

ServicePresenter.defaultProps = {
	direction: 'left',
}

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

			<section className={styles.introductionSection}>
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
							</Translator>{' '}
							🚀
						</h3>
						<div className={styles.ctas}>
							<Link href="/contact">
								<a className={styles.hiremeCta}>
									<span>Hire me</span>
								</a>
							</Link>
							<Link href="/projects">
								<a className={styles.projectsCta}>
									<span>
										<AiOutlineArrowRight />
										<span>See my projects</span>
									</span>
								</a>
							</Link>
						</div>
					</div>
				</Container>
				<img src="landing_wave_1.svg" className={styles.landingWave1} />
			</section>

			<section className={styles.servicesRoot}>
				<Container className={styles.services} size="lg">
					<h2 className={styles.heading}>
						Let your business reach the <span>next</span> step
					</h2>
					<div className={styles.serviceItems}>
						{landingServices.map((lservice, i) => (
							<ServicePresenter
								key={lservice.name}
								service={lservice}
								direction={i % 2 === 0 ? 'left' : 'right'}
							/>
						))}
					</div>

					<div className={styles.ctas}>
						<a className={styles.freeEstimate} href="/estimate">
							<span>Free estimate</span>
						</a>
						<a className={styles.solutionsCta} href="/solutions">
							More solutions
						</a>
					</div>
				</Container>
			</section>

			<section className={styles.howIWorkRoot}>
				<Container
					size="lg"
					className={styles.prioritiesContainer}
					edgePadded={false}
				>
					<h2>My <span className={styles.priorityCount}>3</span> priorities as a developer</h2>
					<div className={styles.priorities}>
						<Priority
							icon={<BsCodeSquare />}
							title="Clean, scalable and maintainable code"
						>
							My main focus when writing code is to keep the
							codebase as small as possible. I also particularily
							care about code readability, so that any engineer
							that would come after me is able to work on my code
							easily. You won't have to commission me if you want
							to add new features to your project, you are free to
							hire someone else!
						</Priority>
						<Priority
							icon={<CgFileDocument />}
							title="Documentation"
						>
							I'm really concerned about producing great
							documentation for every technical stuff I do. If you
							ask me for a web API, you would get full
							documentation about every route that it exposes, the
							same as you would get a full description of how your
							application has been deployed to the cloud, how to
							access it, etc...
						</Priority>
						<Priority
							icon={<IoMdChatbubbles />}
							title="What you tell me you want is what you will get"
						>
							Discussion is my leitmotiv, and that, for any
							project that I work on. I will always ask questions
							if I need to, so that I can deliver a final product
							that best fits your expectations.
						</Priority>
					</div>
					<Link href="/projects" >
						<a className={styles.projectCta}>Dive into my code</a>
					</Link>
				</Container>
			</section>
		</React.Fragment>
	)
}

export default Home
