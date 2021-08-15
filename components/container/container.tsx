import React from 'react';

import styles from "./container.module.css";

type ContainerProps = {
	fillPageHeight?: boolean;
	edgePadded?: boolean;
	backgroundImageUrl?: string | undefined;
}

export const Container: React.FC<ContainerProps> = ({ children, fillPageHeight, edgePadded, backgroundImageUrl }) =>
{
	const buildClassNameFromProps = (): string => {
		const classNames: string[] = [ styles.container ];

		if (fillPageHeight) classNames.push(styles.fillPageHeight);
		if (edgePadded) classNames.push(styles.edgePadded);
		if (backgroundImageUrl) classNames.push(styles.bgImage);

		return classNames.join(' ');
	}

	const buildContainerProps: any = (): object => {
		const containerProps: any = {
			className: buildClassNameFromProps(),
		};

		if (backgroundImageUrl) {
			containerProps.style = { backgroundImage: `url(${backgroundImageUrl})`};
		}

		return containerProps;
	}

	return (
		<div
			{ ... buildContainerProps()}
		>
			{ children }
		</div>
	);
}

Container.defaultProps = {
	fillPageHeight: false,
	edgePadded: true,
	backgroundImageUrl: undefined,
}
