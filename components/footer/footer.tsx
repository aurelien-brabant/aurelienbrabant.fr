import React from 'react'
import Image from 'next/image'
import styles from '../../styles/footer.module.scss'
import { Container } from '../container/container'
import {
	useTranslateFromObject,
	Translator,
	translateFromObject,
} from '../translator/Translator'
import SocialNetworks from '../../components/social-networks/SocialNetworks'
import Link from 'next/link'
import { navtabs } from '../../data/navtabs'

import { services } from '../../data/services'
import useLanguage from '../../hooks/useLanguage'

type FooterInputProps = {}

type FooterBlockInputProps = {
	title: string
	items: { route: string; label: string }[]
}

const FooterBlock: React.FC<FooterBlockInputProps> = ({ title, items }) => {
	return (
		<div className={styles.footerBlock}>
			<h3>{title}</h3>
			<ul>
				{items.map((item) => (
					<li key={item.label}>
						<Link href={item.route}>
							<a>{item.label}</a>
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

export const Footer: React.FC<FooterInputProps> = () => {
	const navtabLanguageSection = 'navtab'
	const language = useLanguage()

	return (
		<div className={styles.footer}>
			<Container className={styles.footerContainer}>
<div className={styles.logoBlock}>
						<Image src="/logo.svg" width="100" height="66" />
						<p>
							<Translator section={'footer'}>
								introduction
							</Translator>
						</p>
					</div>
				<div className={styles.footerBlockWrapper}>
					
					<div className={styles.footerBlock}>
						<div>
						<h3>Solutions</h3>
						<ul>
							{services.map((service) => (
								<li key={service.name.en}>
									<Link href="/#services">
										<a>
											{translateFromObject(
												language,
												service.name
											)}
										</a>
									</Link>
								</li>
							))}
						</ul>
						</div>
					</div>

					<div className={styles.footerBlock}>
						<h3>Pages</h3>
						<ul>
							{navtabs
								.filter((item) => item.label !== 'services')
								.map((item) => (
									<li key={item.label}>
										<Link href={item.route}>
											<a>
												<Translator
													section={
														navtabLanguageSection
													}
												>
													{item.label}
												</Translator>
											</a>
										</Link>
									</li>
								))}
						</ul>
					</div>

					<div className={styles.footerBlock}>
						<h3>Contact</h3>
						<ul>
							<li>
								<Link href="/#contact">
									<a>
										<Translator section="footer">
											contact_form
										</Translator>
									</a>
								</Link>
							</li>
							<li>
								<a href="mailto:contact@aurelienbrabant.fr">
									contact@aurelienbrabant.fr
								</a>
							</li>
						</ul>
					</div>

					<div className={styles.footerBlock}>
						<h3>
							<Translator section="footer">stay_tuned</Translator>
						</h3>
						<SocialNetworks className={styles.socials} />
					</div>
				</div>
				<div className={styles.footerBottom}>
					<small>&copy; 2021 aurelienbrabant.fr</small>
				</div>
			</Container>
		</div>
	)
}
