import React, {ReactNode} from 'react';

import styles from "./container.module.css";

type ContainerProps = {
	fillPageHeight?: boolean;
	edgePadded?: boolean;
	backgroundImage?: ContainerBackgroundImage;
	className?: string | undefined;
	limitedWidth?: boolean; 
}

interface ContainerBackgroundImage {
	url: string;
	rgbaColor?: string;
	opacity?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, fillPageHeight, edgePadded, backgroundImage, className, limitedWidth }) =>
	{
	const buildClassNameFromProps = (): string => {
		const classNames: string[] = [ styles.container ];

		if (fillPageHeight) classNames.push(styles.fillPageHeight);
		if (edgePadded) classNames.push(styles.edgePadded);

		if (className) classNames.push(className);

		if (limitedWidth) classNames.push(styles.limitedWidth);

		return classNames.join(' ');
	}

	const buildContainerProps: any = (): object => {
		const containerProps: any = {
			className: buildClassNameFromProps(),
		};

		return containerProps;
	}

	// assuming backgroundImage is provided
	const buildContainerBackgroundStyle = (): { background: string } | null =>
		{
		if (!backgroundImage) return null;

		let style: { background: string } = { background: `url(${backgroundImage.url})`  };

		if (backgroundImage.rgbaColor) {
			style.background = `linear-gradient(${backgroundImage.rgbaColor}, ${backgroundImage.rgbaColor}), url(${backgroundImage.url})`;
		}

		return style;
	}

	return (
		<div
			{ ... buildContainerProps()}
			style={buildContainerBackgroundStyle()}
		>
			{ children }
		</div>
	);
}

Container.defaultProps = {
	fillPageHeight: false,
	edgePadded: true,
	backgroundImage: undefined,
	limitedWidth: true,
}
