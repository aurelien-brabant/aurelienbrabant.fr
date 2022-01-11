import type { NextPage } from 'next'
import React, { Fragment, ReactElement } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Container } from '../components/container/container'
import {
	Translator,
	translateFromObject,
	useTranslate,
} from '../components/translator/Translator'
import Link from 'next/link'
import styles from '../styles/index.module.scss'

import { AiOutlineArrowRight } from 'react-icons/ai'

import aurelienPhoto from '../public/aurelien.webp'

import UnderlinedText from '../components/UnderlinedText'

import { BsCodeSquare } from 'react-icons/bs'
import { CgFileDocument } from 'react-icons/cg'
import { IoMdChatbubbles } from 'react-icons/io'
import { AiOutlineCloudServer } from 'react-icons/ai'
import { IoMdStats } from 'react-icons/io'
import { HiOutlineDesktopComputer } from 'react-icons/hi'
import { FaToolbox } from 'react-icons/fa'

import useLanguage from '../hooks/useLanguage'

type FavoriteProject = {
	title: string
	description: { fr: string; en: string }
	link: string
	coverURI: string
	direction?: 'left' | 'right'
}

const favoriteProjects: FavoriteProject[] = [
	{
		title: 'Dragon Realms',
		description: {
			en: `DragonRealms is a Non Fongible Token (NFT) business project that I co-founded. Making such a project implied creating an image generator in python, developing and deploying a solidity contract on the Polygon blockchain, and of course, realizing a web frontend to let the customer buy the actual NFTs, which I was in charge of.`,
			fr: "DragonRealms est un projet de vente de Jeton Non Fongible (NFT) que j'ai co-fondé. La réalisation de ce projet a impliqué la création d'un générateur d'image codé en python, le développement d'un contrat solidity déployé sur la blockchain Polygon, et bien sûr, la création d'une interface web destinée à présenter et à acheter les jetons, dont j'étais responsable.",
		},
		link: '/projects/dragon-realms',
		coverURI: '/landing_dragon_realms.webp',
	},
	{
		title: 'Partylens API',
		description: {
			en: `A web API I've built to support a website specialized in the scheduling and organization of nocturn events, using a very innovative back-end framework known as NestJS.`,
			fr: "Une API web que j'ai développé pour supporter une site web spécialisé dans la planification et l'organisation d'évènements nocturnes, utilisant un framework back-end très novateur du nom de NestJS.",
		},
		link: '/projects/Partylens-API',
		coverURI: '/landing_partylens.jpg',
	},
	{
		title: 'aurelienbrabant.fr',
		description: {
			en: `My own website you're browsing right now, which consists in a fullstack web application. I learned most of my advanced skills by working on it (back-end and front-end).`,
			fr: 'Mon site personnel et portfolio que vous visitez actuellement, qui consiste en une application web fullstack. J\'ai appris la grande majorité de mes compétences avancées en travaillant dessus (côté client et côté serveur).',
		},
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
			<p>{translateFromObject(description)}</p>
			<a href={link} className={styles.visitProject}>
				<Translator section={'index'}>visit_project_cta</Translator>
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

type Priority = {
	name: { fr: string; en: string }
	description: { fr: string; en: string }
	icon: ReactElement
}

const priorities: Priority[] = [
	{
		name: {
			fr: 'Un code propre, modulaire et maintenable',
			en: 'Clean, scalable and maintainable code',
		},
		description: {
			fr: "Ma principale préoccupation quand j'écris du code est de garder la base code la plus légère possible. J'attribue par ailleurs beaucoup d'importance à la lisibilité du code, que je juge essentielle pour permettre aux développeurs qui passeraient après moi de s'approprier mon code. Vous n'aurez pas besoin de faire forcément appel à moi pour faire grandir un projet que j'ai initialement développé!",
			en: "My main focus when writing code is to keep the codebase as small as possible. I also particularily care about code readability, so that any enginee that would come after me is able to work on my code easily. You won't have to commission me if you want to add new features to your project, you are free to hire someone else!",
		},
		icon: <BsCodeSquare />,
	},
	{
		name: {
			fr: 'documentation',
			en: 'documentation',
		},
		description: {
			fr: "Afin de rendre votre projet indépendant de moi, je prête attention à documenter tout ce que je fais: que ce soit le code, les procédures de déploiements ou les rapports de bugs, votre project n'aura aucun secret pour vous! Je délivre l'entièreté de cette documentation à la livraison du projet, sans délai.",
			en: 'In order to make your project completely yours, I carefully document everything I do. The code, deployment procedures, bug reports: your project will not have any secret for you! I deliver the full documentation at the same time I deliver the project, without any delay.',
		},
		icon: <CgFileDocument />,
	},
	{
		name: {
			fr: 'Ce que vous demandez est ce que je vais vous livrer',
			en: 'What you ask for is that I will deliver',
		},
		description: {
			fr: "La discussion est mon leitmotiv, et ce, pour n'importe quel projet sur lequel je travaille. Je n'hésiterai pas à vous poser toutes les questions nécessaires, de sorte à ce que je puisse vous livrer le produit final qui correspondra le mieux à vos attentes.",
			en: 'Discussion is my leitmotiv, and that, for any project that I work on. I will always ask questions if I need to, so that I can deliver a final product that best fits your expectations.',
		},
		icon: <IoMdChatbubbles />,
	},
]

const DeveloperPriority: React.FC<{ title: string; icon: ReactElement }> = ({
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

type LandingService = {
	name: { fr: string; en: string }
	description: { fr: string; en: string }
	icon: ReactElement
	bgURI: string
}

const landingServices: LandingService[] = [
	{
		name: {
			en: 'Website creation, from start to finish',
			fr: 'Création de site Internet',
		},
		description: {
			en: 'I will build the website your business need to step up, from start to finish, including front-end and back-end development depending on your needs.',
			fr: "Je vais réaliser votre site Internet pour aider votre project à se digitaliser, comprenant le développement de l'interface graphique et la logique serveur selon les besoins.",
		},
		icon: <HiOutlineDesktopComputer />,
		bgURI: '/landing_website_service.jpg',
	},
	{
		name: {
			en: 'Secure cloud deployment',
			fr: 'Déploiement sécurisé sur le cloud',
		},
		description: {
			en: "I will deploy your website or infrastructure for you on the cloud provider of your choice. Whether it's a standalone website or a containerized set of applications, I will cover your needs and make your project available on the Internet as soon as possible while keeping your costs low.",
			fr: "Je vais assurer le déploiement de votre projet chez le fournisseur de Cloud de votre choix. Que ce soit un simple site web ou un écosystème d'applications conteneurisées, je m'assurerai de faire en sorte que votre projet soit prêt à l'emploi le plus rapidement possible tout en minimisant vos coûts.",
		},
		icon: <AiOutlineCloudServer />,
		bgURI: '/landing_cloud_service.webp',
	},
	{
		name: {
			en: 'Maintenance and problem solving',
			fr: 'Maintenance et résolution de problèmes',
		},
		description: {
			en: 'I will troubleshoot and solve problems of your existing web application so that your activity can stay alive. This includes troubleshooting of performance issues, VPS maintenance, and more (feel free to contact me so that we can talk about your specific situation).',
			fr: "Je vais analyser et résoudre les problèmes de votre application web existante pour que votre activité reste opérationnelle. Cela inclut la résolution de problèmes de performance, la maintenance de vos serveurs, et plus (à voir au cas par cas, n'hésitez pas à me contacter pour pouvoir discuter de votre situation spécifique).",
		},
		icon: <FaToolbox />,
		bgURI: '/landing_speed_service.webp',
	},
	{
		name: {
			en: 'Make the Internet hear about your business',
			fr: 'Amélioration de votre référencement',
		},
		description: {
			en: "Having a good looking website is a great thing, but it's all pointless if it is not properly indexed by search engines like google. I will make sure that your business takes the most out of search engine optimization to make it reach more users.",
			fr: "Avoir un joli site Internet est une chose, mais tout cela est inutile si les moteurs de recherche comme Google ne vous offrent pas un référencement optimal. Je m'engage à permettre à votre projet de tirer un maximum du référencement pour le rendre plus attractif.",
		},
		icon: <IoMdStats />,
		bgURI: '/landing_seo_service.webp',
	},
]

const ServicePresenter: React.FC<{
	service: LandingService
	direction: 'left' | 'right'
}> = ({ service, direction }) => (
	<article
		key={service.name.en}
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
			<h4 className={styles.title}>
				{translateFromObject(service.name)}
			</h4>
			<p className={styles.description}>
				{translateFromObject(service.description)}
			</p>
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
									<span>
										<Translator section={languageSection}>
											hireme
										</Translator>
									</span>
								</a>
							</Link>
							<Link href="/projects">
								<a className={styles.projectsCta}>
									<span>
										<AiOutlineArrowRight />
										<span>
											<Translator
												section={languageSection}
											>
												see_my_projects
											</Translator>
										</span>
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
						<Translator section={languageSection}>
							service_hook
						</Translator>
					</h2>
					<div className={styles.serviceItems}>
						{landingServices.map((lservice, i) => (
							<ServicePresenter
								key={lservice.name.en}
								service={lservice}
								direction={i % 2 === 0 ? 'left' : 'right'}
							/>
						))}
					</div>

					<div className={styles.ctas}>
						<a className={styles.freeEstimate} href="/estimate">
							<Translator section={languageSection}>
								free_estimate
							</Translator>
						</a>
						<a className={styles.solutionsCta} href="/solutions">
							<Translator section={languageSection}>
								more_solutions
							</Translator>
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
						{translateFromObject({ fr: 'Mes', en: 'My' })}{' '}
						<span className={styles.priorityCount}>3</span>{' '}
						{translateFromObject({
							fr: 'priorités en tant que développeur',
							en: 'priorities as a developer',
						})}
					</h2>
					<div className={styles.priorities}>
						{priorities.map((priority) => (
							<DeveloperPriority
								key={priority.name.en}
								title={translateFromObject(priority.name)}
								icon={priority.icon}
							>
								{translateFromObject(priority.description)}
							</DeveloperPriority>
						))}
					</div>
					<Link href="/projects">
						<a className={styles.projectCta}>
							<Translator section={languageSection}>
								dive_into_my_code
							</Translator>
						</a>
					</Link>
				</Container>
			</section>

			<section className={styles.projectsRoot}>
				<Container size="md" className={styles.projectsContainer}>
					<img src="/blob.svg" className={styles.blob} />
					<div className={styles.projectsHeader}>
						<h2>
							<Translator section={languageSection}>
								projects_highlight_heading
							</Translator>
						</h2>
						<h5>
							<Translator section={languageSection}>
								projects_highlight_sub
							</Translator>
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
