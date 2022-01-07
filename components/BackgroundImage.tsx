import React from 'react'
import Image from 'next/image'

import styles from '../styles/background-image.module.scss'

type BackgroundImageProps = {
    src: string;
    objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
    backgroundColor?: string
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({
    src,
    backgroundColor,
    objectFit,
}) => {
    return (
        <React.Fragment>
            {backgroundColor && (
                <div
                    className={styles.colorBackground}
                    style={{ backgroundColor }}
                />
            )}
            {src && <img src={src} className={styles.imageBackground} />}
        </React.Fragment>
    )
}

BackgroundImage.defaultProps = {
    objectFit: 'cover',
}

export default BackgroundImage
