import React, {MouseEventHandler} from 'react';
import { Button } from '../button/button';
import styles from './card.module.css';

type CardInputProps = {
	title: string;
	subtitle?: string | undefined;
	description?: string | undefined;
	imageCoverUrl: string;
	cardClassName?: string;
	buttonClassName?: string;
	onClickUrl?: string;
}

export const Card: React.FC<CardInputProps> = ({ title, subtitle, description, imageCoverUrl, cardClassName, buttonClassName, onClickUrl }) =>
{
	const buildCardClassName = (): string =>
	{
		const cardClassNames = [ styles.card ];

		if (cardClassName) cardClassNames.push(cardClassName);

		return cardClassNames.join(' ');
	}

	/*
	const buildButtonClassName = (): string =>
	{
		const buttonClassNames: string[] = [];

		if (buttonClassName) buttonClassNames.push(buttonClassName);

		return buttonClassNames.join(' ');
	}
	 */

	return (
		<div
			className={buildCardClassName()}
			onClick={() => {
				if (onClickUrl) window.open(onClickUrl, '_blank');
			}}
		>
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
		</div>
	)
}
