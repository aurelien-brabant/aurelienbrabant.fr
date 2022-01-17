import type { NextPage } from 'next'
import React, { Fragment, ReactElement, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Fade } from 'react-awesome-reveal'
import { Container } from '../components/container/container'
import {
	Translator,
	useTranslateFromObject,
	useTranslate,
	translateFromObject,
	translate,
} from '../components/translator/Translator'
import styles from '../styles/index.module.scss'

import { AiOutlineArrowRight } from 'react-icons/ai'
import { FiSend } from 'react-icons/fi'

import { PulseLoader } from 'react-spinners'

import aurelienPhoto from '../public/aurelien.webp'

import UnderlinedText from '../components/UnderlinedText'

import { BsCodeSquare } from 'react-icons/bs'
import { CgFileDocument } from 'react-icons/cg'
import { IoMdChatbubbles } from 'react-icons/io'

import { Service, services } from '../data/services'

import ReCAPTCHA from 'react-google-recaptcha'
import useLanguage from '../hooks/useLanguage'
import CallToAction from '../components/CallToAction'

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
			fr: "DragonRealms est un projet de vente de Jeton Non Fongible (JNF) que j'ai co-fondé. La réalisation de ce projet a impliqué la création d'un générateur d'image codé en python, le développement d'un contrat solidity déployé sur la blockchain Polygon, et bien sûr, la création d'une interface web destinée à présenter et à acheter les jetons, dont j'étais responsable.",
		},
		link: 'https://dragonrealms.fr',
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
			fr: "Mon site personnel et portfolio que vous visitez actuellement, qui consiste en une application web fullstack. J'ai appris la grande majorité de mes compétences avancées en travaillant dessus (côté client et côté serveur).",
		},
		link: '/projects/My-website',
		coverURI: '/logo.svg',
	},
]

const FavoriteProject: React.FC<FavoriteProject> = ({
	direction,
	title,
	description,
	link,
	coverURI,
}) => (
	<Fade triggerOnce>
		<article className={styles.project}>
			{direction === 'left' && (
				<div
					className={styles.imageWrapper}
					style={{ transform: 'rotate(1deg)' }}
				>
					<Image
						alt={`${title}'s illustration`}
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
				<p>{useTranslateFromObject(description)}</p>
				<CallToAction
					href={link}
					target="_blank"
					rel="noreferrer"
					className={styles.visitProject}
				>
					<Translator section={'index'}>visit_project_cta</Translator>
				</CallToAction>
			</div>
			{direction === 'right' && (
				<div
					className={styles.imageWrapper}
					style={{ transform: 'rotate(-1deg)' }}
				>
					<Image
						src={coverURI}
						alt={`${title}'s illustration`}
						className={styles.projectImage}
						width="400"
						height="400"
					/>
				</div>
			)}
		</article>
	</Fade>
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
			fr: "Ma principale préoccupation quand j'écris du code est de garder la base de code la plus légère possible. J'attribue par ailleurs beaucoup d'importance à la lisibilité du code, que je juge essentielle pour permettre aux développeurs qui passeraient après moi de s'approprier mon code. Vous n'aurez pas besoin de faire forcément appel à moi pour faire grandir un projet que j'ai initialement développé!",
			en: "My main focus when writing code is to keep the codebase as small as possible. I also particularily care about code readability, so that any engineer that would come after me is able to work on my code easily. You won't have to commission me if you want to add new features to your project, you are free to hire someone else!",
		},
		icon: <BsCodeSquare />,
	},
	{
		name: {
			fr: 'documentation',
			en: 'documentation',
		},
		description: {
			fr: "Afin de rendre votre projet indépendant de moi, je prête attention à documenter tout ce que je fais: que ce soit le code, les procédures de déploiements ou les rapports de bugs, votre projet n'aura aucun secret pour vous! Je délivre l'entièreté de cette documentation à la livraison du projet, sans délai.",
			en: 'In order to make your project completely yours, I carefully document everything I do. The code, deployment procedures, bug reports: your project will not have any secret for you! I deliver the full documentation at the same time I deliver the project, without any delay.',
		},
		icon: <CgFileDocument />,
	},
	{
		name: {
			fr: 'Communication',
			en: 'Communication',
		},
		description: {
			fr: "La communication est mon leitmotiv, et ce, pour n'importe quel projet sur lequel je travaille. Je n'hésiterai pas à vous poser toutes les questions nécessaires, de sorte à ce que je puisse vous livrer le produit final qui correspondra le mieux à vos attentes.",
			en: 'Communication is my leitmotiv, and that, for any project that I work on. I will always ask questions if I need to, so that I can deliver a final product that best fits your expectations.',
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
		<Fade triggerOnce>
			<div className={styles.text}>
				<h4> {title} </h4>
				<p> {children} </p>
			</div>
		</Fade>
	</article>
)

const ServicePresenter: React.FC<{
	service: Service
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
				{useTranslateFromObject(service.name)}
			</h4>
			<p className={styles.description}>
				{useTranslateFromObject(service.description)}
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

interface ValidatableTarget extends EventTarget {
	checkValidity: () => void
}

const ContactForm: React.FC<{}> = () => {
	const [formData, setFormData] = useState<{
		name: string
		email: string
		message: string
		'g-recaptcha-response': string | null
	}>({ name: '', email: '', message: '', 'g-recaptcha-response': null })
	const [isLoading, setIsLoading] = useState(false)
	const [feedback, setFeedback] = useState<null | {
		msg: string
		type: 'error' | 'info'
	}>(null)

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		;(e.target as ValidatableTarget).checkValidity()
		e.preventDefault()
		setFeedback(null)

		if (formData['g-recaptcha-response'] === null) {
			setFeedback({
				type: 'error',
				msg: 'contact_form_rejected',
			})
			return
		}

		;(window as any).grecaptcha.reset()

		setIsLoading(true)

		const res = await fetch('/api/contact', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		})

		setIsLoading(false)

		const isSuccess = res.status === 201

		setFeedback({
			msg: isSuccess ? 'contact_form_sent' : 'contact_form_rejected',
			type: isSuccess ? 'info' : 'error',
		})

		setFormData({
			name: formData.name,
			email: formData.email,
			message: '',
			'g-recaptcha-response': null,
		})
	}

	return (
		<div>
			{feedback && (
				<small
					className={styles.formError}
					style={{
						color:
							feedback.type === 'error' ? '#C53030' : '#68D391',
					}}
				>
					<Translator section={'index'}>{feedback.msg}</Translator>
				</small>
			)}
			<form onSubmit={handleSubmit}>
				<div className={styles.inputs}>
					<input
						name="name"
						type="text"
						placeholder={useTranslate(
							'form_name_placeholder',
							'index'
						)}
						onChange={handleChange}
						value={formData.name}
						required
					/>
					<input
						name="email"
						type="email"
						placeholder={useTranslate(
							'form_email_placeholder',
							'index'
						)}
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</div>
				<textarea
					name="message"
					placeholder={useTranslate(
						'form_textarea_placeholder',
						'index'
					)}
					onChange={handleChange}
					defaultValue={formData.message}
					required
				/>
				<div className={styles.submitPart}>
					<ReCAPTCHA
						sitekey={
							process.env.NEXT_PUBLIC_RECAPTCHA2_PUBLIC as string
						}
						onChange={(value) => {
							setFormData({
								...formData,
								'g-recaptcha-response': value,
							})
						}}
					/>
					<button
						type="submit"
						style={{ opacity: isLoading ? '.5' : '1' }}
					>
						{isLoading ? (
							<PulseLoader color="#fff" />
						) : (
							<React.Fragment>
								<FiSend />
								<span>send</span>
							</React.Fragment>
						)}
					</button>
				</div>
			</form>
		</div>
	)
}

/*
 ** Technologies identified by these names will not be displayed in the technologies.
 ** Names are expected to be lowercase.
 */

const Home: NextPage = () => {
	const languageSection = 'index'
	const language = useLanguage()

	return (
		<React.Fragment>
			<Head>
				<title>{translate('fr', 'title', 'index')}</title>
				<meta
					name="description"
					content={translate('fr', 'meta_description', 'index')}
				/>
				<meta name="robots" content="index, follow" />
				<link rel="canonical" href={`https://aurelienbrabant.fr`} />

				<meta property="og:url" content="https://aurelienbrabant.fr/" />
				<meta property="og:type" content="website" />
				<meta
					property="og:title"
					content={translate('fr', 'title', 'index')}
				/>
				<meta
					property="og:description"
					content={translate('fr', 'meta_description', 'index')}
				/>
				<meta property="og:image" content="/og-landing.webp" />

				<meta name="twitter:card" content="summary_large_image" />
				<meta property="twitter:domain" content="aurelienbrabant.fr" />
				<meta
					property="twitter:url"
					content="https://aurelienbrabant.fr/"
				/>
				<meta
					name="twitter:title"
					content={translate('fr', 'title', 'index')}
				/>
				<meta
					name="twitter:description"
					content={translate('fr', 'meta_description', 'index')}
				/>
				<meta name="twitter:image" content="/og-landing.webp" />
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
							<CallToAction
								href="/#contact"
								className={styles.hiremeCta}
							>
								<span>
									<Translator section={languageSection}>
										hireme
									</Translator>
								</span>
							</CallToAction>
							<CallToAction
								href="/projects"
								className={styles.projectsCta}
							>
								<span>
									<AiOutlineArrowRight />
									<span>
										<Translator section={languageSection}>
											see_my_projects
										</Translator>
									</span>
								</span>
							</CallToAction>
						</div>
					</div>
				</Container>
				<img
					src="landing_wave_1.svg"
					alt={'wave svg'}
					className={styles.landingWave1}
				/>
			</section>

			<section className={styles.servicesRoot} id="services">
				<Container className={styles.services} size="lg">
					<h2 className={styles.heading}>
						<Translator section={languageSection}>
							service_hook
						</Translator>
					</h2>
					<div className={styles.serviceItems}>
						{services.map((lservice, i) => (
							<ServicePresenter
								key={lservice.name.en}
								service={lservice}
								direction={i % 2 === 0 ? 'left' : 'right'}
							/>
						))}
					</div>

					<div className={styles.ctas}>
						<CallToAction
							eventLabel="landing_estimate"
							href="/#contact"
							className={styles.freeEstimate}
							colorVariant="secondary"
						>
							<Translator section={languageSection}>
								free_estimate
							</Translator>
						</CallToAction>
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
						{useTranslateFromObject({ fr: 'Mes', en: 'My' })}{' '}
						<span className={styles.priorityCount}>3</span>{' '}
						{useTranslateFromObject({
							fr: 'priorités en tant que développeur',
							en: 'priorities as a developer',
						})}
					</h2>
					<div className={styles.priorities}>
						{priorities.map((priority) => (
							<DeveloperPriority
								key={priority.name.en}
								title={translateFromObject(
									language,
									priority.name
								)}
								icon={priority.icon}
							>
								{translateFromObject(
									language,
									priority.description
								)}
							</DeveloperPriority>
						))}
					</div>
					<CallToAction
						href="/projects"
						className={styles.projectCta}
					>
						<Translator section={languageSection}>
							dive_into_my_code
						</Translator>
					</CallToAction>
				</Container>
			</section>

			<section className={styles.projectsRoot}>
				<Container size="md" className={styles.projectsContainer}>
					<img src="/blob.svg" alt={''} className={styles.blob} />
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
			<section className={styles.formSection} id="contact">
				<Container className={styles.formContainer}>
					<div className={styles.formHeading}>
						<h2>
							{' '}
							<Translator section={languageSection}>
								form_heading
							</Translator>{' '}
						</h2>
						<h4>
							{' '}
							<Translator section={languageSection}>
								form_subheading
							</Translator>{' '}
						</h4>
					</div>
					<ContactForm />
					<p className={styles.orSendMailTo}>
						<Translator section={languageSection}>
							or_send_mail
						</Translator>{' '}
						<a
							href="mailto:contact@aurelienbrabant.fr"
							style={{ textDecoration: 'underline' }}
						>
							contact@aurelienbrabant.fr
						</a>
					</p>
				</Container>
			</section>
		</React.Fragment>
	)
}

export default Home
