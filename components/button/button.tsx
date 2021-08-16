import React from 'react';
import styles from './button.module.css';

type ButtonInputProps = {
	className?: string;
}

export const Button: React.FC<ButtonInputProps> = ({ children, className }) =>
{
	const buildButtonClassName = (): string => {
		const classNames = [ styles.button ];

		if (className) classNames.push(className);

		return classNames.join(' ');
	}

	return (
		<a href='/' className={buildButtonClassName()}>
			{children}
		</a>
	);
}
