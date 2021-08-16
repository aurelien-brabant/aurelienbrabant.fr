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
	hexColor?: string;
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
	const renderBackgroundImage = (): ReactNode | null =>
	{
		if (!backgroundImage) return null;

		return (
			<React.Fragment>

				{ /* render background if provided */ }
				{ backgroundImage.hexColor  && (
					<div
						className={styles.backgroundImageColor}
						style={{
							backgroundColor: backgroundImage.hexColor,
							opacity: backgroundImage.opacity
						}}
					/>
				)}

				<div
					className={styles.imageBackground}
					style={{ backgroundImage: `url(${backgroundImage.url})`}}
				/>
			</React.Fragment>

		);
	}

	return (
		<div
			{ ... buildContainerProps()}
		>
			{ renderBackgroundImage() }
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
