import React from 'react';

import styles from '../styles/underlined-text.module.css';

type UnderlinedTextProps = {
    underlineColor: string;
    className?: string;
    as?: string;
}

const UnderlinedText: React.FC<UnderlinedTextProps> = ({className, children, as, underlineColor}) => {
    const actualClassName = `${className ? className : ''} ${styles.text}`;
    
    return (
        <div className={`${styles.textWrapper} ${actualClassName}`}>
            <div className={styles.underline} style={{backgroundColor: underlineColor}} />
            {React.createElement(as as string, null, children)}
        </div>
    );
}

UnderlinedText.defaultProps = {
    as: 'p'
}

export default UnderlinedText;
