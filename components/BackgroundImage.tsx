import React from 'react'
import Image from 'next/image'

import styles from '../styles/background-image.module.scss'

type BackgroundImageProps = {
    src: string | StaticImageData | undefined
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
            <div className={styles.imageBackground}>
                {src && <Image src={src} layout="fill" objectFit={objectFit} />}
            </div>
        </React.Fragment>
    )
}

BackgroundImage.defaultProps = {
    objectFit: 'cover',
}

export default BackgroundImage
