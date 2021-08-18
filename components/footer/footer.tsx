import React from 'react';
import styles from './footer.module.css';
import { Container } from '../container/container';
import Link from 'next/link';

type FooterInputProps = {
}

type FooterBlockInputProps = {
	title: string;
	items: { route: string; label: string; }[];
}

const FooterBlock: React.FC<FooterBlockInputProps> = ({ title, items }) => {
	return (
		<div
			className={styles.footerBlock}
		>
			<h3>
				{title}
			</h3>
			<ul>
				{items.map(item => (
					<li><Link href={item.route}><a>{item.label}</a></Link></li>
				))}
			</ul>
		</div>
	)
}

export const Footer: React.FC<FooterInputProps> = () =>
{
	return (
		<div
			className={styles.footer}
		>
			<Container
				className={styles.footerContainer}
			>
				<FooterBlock
					title="Pages"
					items={[
						{
							label: 'blog',
							route: '/blog'
						}
					]}
				/>
			</Container>
		</div>
	);
}
