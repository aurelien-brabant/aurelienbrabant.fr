import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import BackgroundImage from '../../components/BackgroundImage'
import { Container } from '../../components/container/container'
import projects, { Project } from '../../data/projects'
import { getTechnology } from '../../data/technologies'
import styles from '../../styles/project.module.scss'

export async function getStaticPaths() {
    const paths = projects.map((project) => ({
        params: { id: project.id },
    }))

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }: { params: { id: string } }) {
    for (const project of projects) {
        if (project.id === params.id) {
            return {
                props: {
                    project,
                },
            }
        }
    }
    return { props: { project: null } }
}

type ProjectPageProps = {
    project: Project
}

const ProjectPage: NextPage<ProjectPageProps> = ({ project }) => {
    return (
        <React.Fragment>
            <Head>
                <title> {project.name} | Aurelien Brabant </title>
            </Head>
            <Container
                className={styles.projectHeader}
                edgePadded={false}
                limitedWidth={false}
            >
                <h1> {project.name} </h1>
                <h2> {project.description} </h2>
            </Container>
            <Container
                edgePadded={false}
                limitedWidth={false}
                className={styles.projectContainer}
            >
                <div className={styles.banner}>
                    <BackgroundImage src={project.illustration} backgroundColor={'rgba(20, 20, 20, .90)'}/>
                    <div className={styles.bannerContent}>
                        <div className={styles.technologyIcons}>
                            {project.technologies.map((technology) => (
                                <img
                                    key={technology}
                                    src={getTechnology(technology)?.imageUrl}
                                    alt={technology}
                                />
                            ))}
                        </div>
                        {project.githubLink && (
                            <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {' '}
                                source code
                                <svg
                                    role="img"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <title>GitHub</title>
                                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                </svg>
                            </a>
                        )}
                    </div>
                </div>
                <Container className={styles.projectContent}>
                    <h3> About this project </h3>
                    <p>{project.about}</p>
                    <h3> Technologies and concepts learned</h3>
                    <ul>
                        {project.learned.map((learned) => (
                            <li key={learned}>{learned}</li>
                        ))}
                    </ul>
                </Container>
            </Container>
        </React.Fragment>
    )
}

export default ProjectPage
