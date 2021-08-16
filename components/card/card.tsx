import React from 'react';
import {Container} from '../container/container';
import styles from './card.module.css';

type CardInputProps = {
	title: string;
	subtitle?: string | undefined;
	description?: string | undefined;
	imageCoverUrl: string;
	cardClassName?: string;
}

export const Card: React.FC<CardInputProps> = ({ title, subtitle, description, imageCoverUrl, cardClassName }) =>
{
	const buildCardClassName = (): string =>
	{
		const cardClassNames = [ styles.card ];

		if (cardClassName) cardClassNames.push(cardClassName);

		return cardClassNames.join(' ');
	}

	return (
		<div className={buildCardClassName()}>
			{ imageCoverUrl && (
				<div
					className={styles.image}
					style={{backgroundImage: `url(${imageCoverUrl})`}}
				>
				</div>
			)}
			<div
				className={styles.textSection}
			>
				<h3> {title} </h3>
				<h4> {subtitle} </h4>
				<hr />
				<p> {description} </p>
			</div>

			<button style={{marginTop: 'auto'}}> See it on github! </button>
		</div>
	)
}
