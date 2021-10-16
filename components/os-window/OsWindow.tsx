import styles from './os-window.module.css';

type OsWindowProps = {
    title: string;
    contentClassName?: string;
}

const OsWindow: React.FC<OsWindowProps> = ({ title, children, contentClassName }) => {
    return (
        <div className={`${styles.osWindow}`}>
            <div className={styles.osWindowDecoration}>
                <h2>{title}</h2>
                <i className={styles.closeButton} />
                <i className={styles.minimizeButton} />
                <i className={styles.fullscreenButton} />
            </div>
            <div className={`${styles.content} ${contentClassName}`} >
                {children}
            </div>
        </div >
    );
}

export default OsWindow;