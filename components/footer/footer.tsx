import React from "react";
import styles from "../../styles/footer.module.scss";
import { Container } from "../container/container";
import { Translator } from "../translator/Translator";
import SocialNetworks from '../../components/social-networks/SocialNetworks';
import Link from "next/link";
import { navtabs } from "../../data/navtabs";

type FooterInputProps = {};

type FooterBlockInputProps = {
	title: string;
	items: { route: string; label: string }[];
};

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
	);
};

export const Footer: React.FC<FooterInputProps> = () => {
	const navtabLanguageSection = "navtab";
	return (
		<div className={styles.footer}>
			<Container className={styles.footerContainer}>
				<div className={styles.footerBlockWrapper}>
					<div className={styles.footerBlock}>
						<h3>Pages</h3>
						<ul>
							{navtabs.map((item) => (
								<li key={item.label}>
									<Link href={item.route}>
										<a>
											<Translator
												section={navtabLanguageSection}
											>
												{item.label}
											</Translator>
										</a>
									</Link>
								</li>
							))}
						</ul>
					</div>
					<FooterBlock title="Solutions" items={[]} />
					<FooterBlock title="Contact" items={[
						{
							label: "hi@aurelienbrabant.fr",
							route: "mailto:hi@aurelienbrabant.fr"
						}
					]} />
				</div>
				<SocialNetworks
					className={styles.socials}
				/>
				<div className={styles.footerContactInfo}>
					<small>&copy; Copyright {new Date().getFullYear()}, aurelienbrabant.fr</small>
				</div>
			</Container>
		</div>
	);
};
