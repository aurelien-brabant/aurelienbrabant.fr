import { AiOutlineCloudServer } from 'react-icons/ai'
import { IoMdStats } from 'react-icons/io'
import { HiOutlineDesktopComputer } from 'react-icons/hi'
import { FaToolbox } from 'react-icons/fa'
import {ReactElement} from 'react'

export type Service = {
	name: { fr: string; en: string }
	description: { fr: string; en: string }
	icon: ReactElement
	bgURI: string
}

export const services: Service[] = [
	{
		name: {
			en: 'Full responsive website creation',
			fr: 'Réalisation complète de votre site Internet "responsive"',
		},
		description: {
			en: 'I will build the website your business need to step up, from start to finish, including front-end and back-end development depending on your needs: creation of a database, user authentication system, payment module...',
			fr: "Je vais réaliser votre site Internet pour aider votre projet à se digitaliser, comprenant le développement de l'interface graphique ainsi que de la logique serveur selon vos besoins : mise en place d'une base de données, d'un système d'authentification, d'un module de paiement...",
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
			en: 'Search Engine Optimization Boost',
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
