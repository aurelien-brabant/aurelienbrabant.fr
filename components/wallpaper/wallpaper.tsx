import React from 'react';

import styles from './wallpaper.module.css';

interface WallpaperBackgroundColor {
	hexColor: string;
	opacity: string;
}

type WallpaperInputProps = {
	imageUrl: string;
	wallpaperBackgroundColor?: WallpaperBackgroundColor | undefined;
}

export const Wallpaper: React.FC<WallpaperInputProps> = ({ imageUrl, wallpaperBackgroundColor }) =>
{
	return (
		<div
			className={styles.image}
			style={{
				backgroundImage: `url(${imageUrl})`
			}}
		>
			{ wallpaperBackgroundColor && (
				<div
					className={styles.background}
					style={{
						backgroundColor: wallpaperBackgroundColor.hexColor,
						opacity: wallpaperBackgroundColor.opacity
					}}
				/>
			)}
		</div>
	)
}
