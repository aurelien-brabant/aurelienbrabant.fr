import styles from '../styles/heading.module.scss'
import { Translator } from './translator/Translator'

type HeadingProps = {
    title: string
}

const Heading: React.FC<HeadingProps> = ({ title }) => (
    <section className={styles.aboutBanner}>
        <h1>
            <Translator section="navtab">{title}</Translator>
        </h1>
    </section>
)

export default Heading
