import type { NextPage } from 'next'
import React, { Fragment, ReactElement } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Container } from '../components/container/container'
import { Translator } from '../components/translator/Translator'
import Link from 'next/link'
import styles from '../styles/index.module.scss'

import { AiOutlineArrowRight } from 'react-icons/ai'

import aurelienPhoto from '../public/aurelien.webp'

import UnderlinedText from '../components/UnderlinedText'

import { BsCodeSquare } from 'react-icons/bs'
import { CgFileDocument } from 'react-icons/cg'
import { IoMdChatbubbles } from 'react-icons/io'

import landingServices, { LandingService } from '../data/landing_services'

type FavoriteProject = {
	title: string
	description: string
	link: string
	coverURI: string
	direction?: 'left' | 'right'
}

const favoriteProjects: FavoriteProject[] = [
	{
		title: 'Dragon Realms',
		description: `DragonRealms is a Non Fongible Token (NFT) business project that I co-founded. Making such a project implied creating a generator that is able to randomly generate drakes (made in python), developing and deploying a contract on the Polygon blockchain, and of course, realizing a web frontend to let the customer buy the actual NFTs, which I was in charge of.`,
		link: '/projects/dragon-realms',
		coverURI: '/landing_dragon_realms.webp',
	},
	{
		title: 'Partylens API',
		description: `A web API I've built to support a website specialized in the scheduling and organization of nocturn events.`,
		link: '/projects/Partylens-API',
		coverURI: '/landing_partylens.jpg',
	},
	{
		title: 'aurelienbrabant.fr',
		description: `My own website you're browsing right now, which consists in a fullstack web application. I learned most of my advanced knowledge by working on it.`,
		link: '/projects/Partylens-API',
		coverURI: '/large_abrabant.jpg',
	},
]

const FavoriteProject: React.FC<FavoriteProject> = ({
	direction,
	title,
	description,
	link,
	coverURI,
}) => (
	<article className={styles.project}>
		{direction === 'left' && (
			<div className={styles.imageWrapper}>
				<Image
					src={coverURI}
					className={styles.projectImage}
					width="400"
					height="400"
				/>
			</div>
		)}
		<div className={styles.projectText}>
			<UnderlinedText
				underlineColor="#e2725b"
				as="h3"
				className={styles.projectTitle}
			>
				{title}
			</UnderlinedText>
			<p>{description}</p>
			<a href={link} className={styles.visitProject}>
				Visit project
			</a>
		</div>
		{direction === 'right' && (
			<div className={styles.imageWrapper}>
				<Image
					src={coverURI}
					className={styles.projectImage}
					width="400"
					height="400"
				/>
			</div>
		)}
	</article>
)

FavoriteProject.defaultProps = {
	direction: 'left',
}

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

const Home: NextPage = () => {
	const languageSection = 'index'

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
					<h2>
						My <span className={styles.priorityCount}>3</span>{' '}
						priorities as a developer
					</h2>
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
					<Link href="/projects">
						<a className={styles.projectCta}>Dive into my code</a>
					</Link>
				</Container>
			</section>

			<section className={styles.projectsRoot}>
				<Container size="md" className={styles.projectsContainer}>
					<img src="/blob.svg" className={styles.blob} />
					<div className={styles.projectsHeader}>
						<h2>Projects that I enjoyed working on</h2>
						<h5>
							Here is a curated list of web related projects that
							I particularily enjoyed doing
						</h5>
					</div>

					<div className={styles.projects}>
						{favoriteProjects.map((fp, i) => (
							<FavoriteProject
								key={fp.title}
								{...fp}
								direction={i % 2 === 0 ? 'left' : 'right'}
							/>
						))}
					</div>
				</Container>
			</section>
		</React.Fragment>
	)
}

export default Home
