import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '../button/button'
import styles from '../../styles/header.module.scss'
import { navtabs } from '../../data/navtabs'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import disableScroll from 'disable-scroll'
import LanguageSwitcher from '../language-switcher/LanguageSwitcher'
import { Translator } from '../translator/Translator'
import Dropdown from '../Dropdown'
import BackgroundImage from '../BackgroundImage'

import landingBg from '../../public/landing_bg.webp';

const Header: React.FC<{}> = () => {
	const navtabLanguageSection = 'navtab'
	const headerLanguageSection = 'header'

	const [selected, setSelected] = useState(0)
	const [isVisible, setIsVisible] = useState(false)

	const router = useRouter()

	useEffect(() => {
		const tmp = router.route.split('/')
		const baseRoute = tmp.length > 0 ? `/${tmp[1]}` : '/'
		for (const tab of navtabs) {
			if (tab.children) {
				for (const link of tab.children) {
					if (link.route === baseRoute) {
						setSelected(tab.id)
						return
					}
				}
			}
			if (tab.route === baseRoute) {
				setSelected(tab.id)
				return
			}
		}
	}, [router.asPath, router.route])

	if (isVisible) disableScroll.on()
	else disableScroll.off()

	return (
		<React.Fragment>
			<div
				className={`${styles.hider} ${isVisible ? styles.visible : ''}`}
				onClick={() => {
					setIsVisible(false)
				}}
			/>
			<nav
				className={`${styles.menu} ${isVisible ? styles.visible : ''}`}
			>
				<div className={styles.menuContainer}>
					{navtabs.map((tab) =>
						tab.children ? (
							<Dropdown
								links={tab.children}
								titleClassName={`${styles.tab} ${
									selected === tab.id ? styles.activated : ''
								} ${isVisible ? styles.visible : ''}`}
								linkClassName={`${styles.dropdownTab}
							 ${isVisible ? styles.visible : ''}`}
								contentClassName={styles.tabDropdown}
								onLinkClick={() => {
									setIsVisible(false)
								}}
							>
								{tab.label}
							</Dropdown>
						) : (
							<h1
								key={tab.id}
								className={`${styles.tab} ${
									selected === tab.id ? styles.activated : ''
								} ${isVisible ? styles.visible : ''}`}
								onClick={() => {
									setIsVisible(false)
								}}
							>
								<Link key={tab.id} href={tab.route}>
									<a>
										<Translator
											section={navtabLanguageSection}
										>
											{tab.label}
										</Translator>
									</a>
								</Link>
							</h1>
						)
					)}
				</div>
			</nav>
			<header className={styles.header}>
				<div className={styles.logoWrapper}>
					<Image
						className={styles.rudder}
						width="35"
						height="35"
						src="/rudder.png"
						alt={'rudder logo'}
						onClick={() => {
							setIsVisible(!isVisible)
						}}
					/>
					<Link href="/">
						<a className={styles.logo}>AB</a>
					</Link>
				</div>
				<ul>
					{navtabs.map((tab) => (
						<li
							className={selected === tab.id ? styles.active : ''}
							key={tab.id}
						>
							{tab.children ? (
								<Dropdown
									type={'normal'}
									links={tab.children}
									contentClassName={styles.dropdownContent}
									titleClassName={
										selected === tab.id ? styles.active : ''
									}
									onLinkClick={() => {
										setIsVisible(false)
									}}
								>
									{tab.label}
								</Dropdown>
							) : (
								<Link href={tab.route ? tab.route : ''}>
									<a
										onClick={() => {
											setSelected(tab.id)
											setIsVisible(false)
										}}
									>
										<Translator
											section={navtabLanguageSection}
										>
											{tab.label}
										</Translator>
									</a>
								</Link>
							)}
						</li>
					))}
				</ul>
				<div className={styles.rightmostSection}>
					<LanguageSwitcher />
					<Button href="/contact" className={styles.projectCta}>
						<Translator section={headerLanguageSection}>
							get in touch
						</Translator>
					</Button>
				</div>
			</header>
			<div className={styles.headerOffset} />
		</React.Fragment>
	)
}

export default Header
