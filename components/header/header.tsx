import React, {useEffect, useState} from 'react';
import {Button} from '../button/button';
import styles from './header.module.css';
import { navtabs } from '../../data/navtabs';
import {useRouter} from 'next/dist/client/router';
import Link from 'next/link';
import disableScroll from 'disable-scroll';

const Header: React.FC<{}> = () =>
	{
	const [ selected, setSelected ] = useState(0);
	const [ isVisible, setIsVisible ] = useState(false);

	const router = useRouter();	

	useEffect(() => {
		const tmp = router.route.split('/');
		const baseRoute = tmp.length > 0 ? `/${tmp[1]}` : '/';
		for (const tab of navtabs) {
			if (tab.route === baseRoute) {
				setSelected(tab.id);
				return ;
			}
		}

	}, [router.asPath, router.route]);


	if (isVisible) disableScroll.on();
	else disableScroll.off();

	return (
		<React.Fragment>
			<div
				className={`${styles.hider} ${isVisible ? styles.visible : ''}` }
				onClick={() => { setIsVisible(false) }}
			/>
			<nav className={`${styles.menu} ${isVisible ? styles.visible : ''}`}>
				{ navtabs.map(tab => (
					<h1
						key={tab.id}
						onClick={() => {
							setSelected(tab.id)
							setIsVisible(false)
						}}
						className={`${styles.tab} ${selected === tab.id ? styles.activated : '' } ${isVisible ? styles.visible : ''}`}
					>
						<Link
							key={tab.id} 
							href={tab.route}
						>
							{tab.label}
						</Link>
					</h1>
				)) }
			</nav>
			<header
				className={styles.header}
			>
				<div
					className={styles.logoWrapper}
				>
					<img
						className={styles.rudder}
						src="/rudder.svg" 
						onClick={() => { setIsVisible(!isVisible); } }
					/>
					<Link href="/"><a className={styles.logo}>Aurélien Brabant</a></Link>
				</div>
				<ul>
					{navtabs.map(tab => (
						<li
							className={selected === tab.id ? styles.active : ''}
							key={tab.id}
							onClick={() => { setSelected(tab.id); setIsVisible(false); }}
						>
							<Link href={tab.route}>
								<a>{tab.label}</a>
							</Link>
						</li>
					))}
				</ul>
				<Button
					href='/soon'
					className={styles.projectCta}
				>
					Want to work with me?
				</Button>
			</header>
		</React.Fragment>
	);
}

export default Header;
