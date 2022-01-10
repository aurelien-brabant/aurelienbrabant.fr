import {ReactComponentElement, ReactElement} from "react";
import { RiMacbookLine } from 'react-icons/ri';
import { AiOutlineCloudServer } from 'react-icons/ai';
import { IoMdStats, IoIosSpeedometer } from 'react-icons/io';
import { HiOutlineDesktopComputer } from 'react-icons/hi';

export type LandingService = {
	name: string;
	description: string;
	icon: ReactElement
	bgURI: string;
}

const landingServices: LandingService[] = [
	{
		name: 'Website creation, from start to finish',
		description: 'You need your own website to build your online presence but don\'t know where to start? From start to finish, I\'ll guide you and build the only website you will ever need to make your business grow.',
		icon: <HiOutlineDesktopComputer />,
		bgURI: '/landing_website_service.jpg'
	},
	{
		name: 'Secure and reliable cloud deployments',
		description: 'I will deploy your website or infrastructure for you on the cloud provider of your choice. Whether it\'s a standalone website or a containerized set of applications, I will cover your needs and make your project available on the Internet as soon as possible.',
		icon: <AiOutlineCloudServer />,
		bgURI: '/landing_cloud_service.webp'
	},
	{
		name: 'Making things go faster',
		description: 'Your clients should not have to wait: I will troubleshoot major performance issues in your web application and fix them for you.',
		icon: <IoIosSpeedometer />,
		bgURI: '/landing_speed_service.webp'

	},
	{
		name: 'Make the Internet hear about your business',
		description: 'Having a good looking website is a great thing, but it\'s all pointless if it is not properly indexed by search engines like google. I will make sure that your business takes the most out of search engine optimization to help it attract more users.',
		icon: <IoMdStats />,
		bgURI: '/landing_seo_service.webp'
	},
];

export default landingServices;
