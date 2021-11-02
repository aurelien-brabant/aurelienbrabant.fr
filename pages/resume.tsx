import { NextPage } from 'next'
import { Container } from '../components/container/container'

import styles from '../styles/resume.module.scss'

const Resume: NextPage = () => {
    return (
        <Container
            fillPageHeight={true}
            className={styles.resumeBackgroundContainer}
            limitedWidth={false}
        >
            <Container>
            <h1>I'm currently building my resume, please come back later!</h1>
            </Container>
        </Container>
    )
}

export default Resume
