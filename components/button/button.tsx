import React from 'react';
import styles from './button.module.css';
import Link from 'next/link';

type ButtonInputProps = {
	className?: string;
	href: string;
}

export const Button: React.FC<ButtonInputProps> = ({ children, className, href }) =>
{
	const buildButtonClassName = (): string => {
		const classNames = [ styles.button ];

		if (className) classNames.push(className);

		return classNames.join(' ');
	}

	return (
		<Link href={href}>
			<a className={buildButtonClassName()}>
				{children}
			</a>
		</Link>
	);
}

Button.defaultProps = {
	href: '/'
}
