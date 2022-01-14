import React from 'react'
import styles from '../../styles/footer.module.scss'
import { Container } from '../container/container'
import { translateFromObject, Translator } from '../translator/Translator'
import SocialNetworks from '../../components/social-networks/SocialNetworks'
import Link from 'next/link'
import { navtabs } from '../../data/navtabs'
import h3 from '../UnderlinedText'

import { services } from '../../data/services'

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
	return (
		<div className={styles.footer}>
			<Container className={styles.footerContainer}>
				<div className={styles.footerBlockWrapper}>
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
						<h3>Solutions</h3>
						<ul>
							{services.map((service) => (
								<li key={service.name.en}>
									<Link href="/#services">
										<a>
											{translateFromObject(service.name)}
										</a>
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div className={styles.footerBlock}>
						<h3>Contact</h3>
						<ul>
							<li><Link href="/contact"><a href="/contact">Contact form</a></Link></li>
							<li><a href="mailto:contact@aurelienbrabant.fr">contact@aurelienbrabant.fr</a></li>
						</ul>
					</div>

					<div className={styles.footerBlock}>
						<h3>Suivre mon actualité</h3>
						<SocialNetworks className={styles.socials} />
					</div>
				</div>
				<div className={styles.footerContactInfo}>
					<small>
						&copy; Copyright {new Date().getFullYear()},
						aurelienbrabant.fr
					</small>
				</div>
			</Container>
		</div>
	)
}
