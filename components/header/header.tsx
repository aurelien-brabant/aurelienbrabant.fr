import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { Button } from "../button/button";
import styles from "../../styles/header.module.scss";
import { navtabs } from "../../data/navtabs";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import disableScroll from "disable-scroll";
import LanguageSwitcher from "../language-switcher/LanguageSwitcher";
import { Translator } from "../translator/Translator";

const Header: React.FC<{}> = () => {
	const navtabLanguageSection = "navtab";
	const headerLanguageSection = "header";

	const [selected, setSelected] = useState(0);
	const [isVisible, setIsVisible] = useState(false);

	const router = useRouter();

	useEffect(() => {
		const tmp = router.route.split("/");
		const baseRoute = tmp.length > 0 ? `/${tmp[1]}` : "/";
		for (const tab of navtabs) {
			if (tab.route === baseRoute) {
				setSelected(tab.id);
				return;
			}
		}
	}, [router.asPath, router.route]);

	if (isVisible) disableScroll.on();
	else disableScroll.off();

	return (
		<React.Fragment>
			<div
				className={`${styles.hider} ${isVisible ? styles.visible : ""}`}
				onClick={() => {
					setIsVisible(false);
				}}
			/>
			<nav
				className={`${styles.menu} ${isVisible ? styles.visible : ""}`}
			>
				{navtabs.map((tab) => (
					<h1
						key={tab.id}
						onClick={() => {
							setSelected(tab.id);
							setIsVisible(false);
						}}
						className={`${styles.tab} ${selected === tab.id ? styles.activated : ""
							} ${isVisible ? styles.visible : ""}`}
					>
						<Link key={tab.id} href={tab.route}>
							<a>
								<Translator section={navtabLanguageSection}>
									{tab.label}
								</Translator>
							</a>
						</Link>
					</h1>
				))}
			</nav>
			<header className={styles.header}>
				<div className={styles.logoWrapper}>
					<Image
						className={styles.rudder}
						width="35"
						height="35"
						src="/rudder.png"
						alt={"rudder logo"}
						onClick={() => {
							setIsVisible(!isVisible);
						}}
					/>
					<Link href="/">
						<a className={styles.logo}>AB</a>
					</Link>
				</div>
				<ul>
					{navtabs.map((tab) => (
						<li
							className={selected === tab.id ? styles.active : ""}
							key={tab.id}
							onClick={() => {
								setSelected(tab.id);
								setIsVisible(false);
							}}
						>
							<Link href={tab.route}>
								<a>
									<Translator section={navtabLanguageSection}>
										{tab.label}
									</Translator>
								</a>
							</Link>
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
	);
};

export default Header;
