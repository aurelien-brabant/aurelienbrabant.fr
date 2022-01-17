import { GetServerSideProps } from 'next'
import React, { useEffect, useState } from 'react'
import { Container } from '../components/container/container'
import { Fade } from 'react-awesome-reveal'
import Link from 'next/link'
import Head from 'next/head'
import BackgroundImage from '../components/BackgroundImage'

import styles from '../styles/projects.module.scss'
import { useTranslate } from '../components/translator/Translator'

export const getServerSideProps: GetServerSideProps = async (context) => {
    let res = await fetch(
        `http://${process.env.API_HOST}:${process.env.API_PORT}/projects`
    )

    const projects: BrabantApi.ProjectPreview[] = await res.json()

    const technologyNames: string[] = []

    /* Retrieve the names of the USED technologies without making an extra API call to the /technologies
     * endpoint (that'd retrieve the complete technology list, not only those actually used by the presented projects).
     */

    for (const project of projects) {
        for (const techno of project.technologies) {
            if (!technologyNames.includes(techno.name)) {
                technologyNames.push(techno.name)
            }
        }
    }

    return {
        props: {
            technologyNames,
            projects,
        },
    }
}

type ProjectsPageProps = {
    projects: BrabantApi.ProjectPreview[]
    technologyNames: string[]
}

const Projects: React.FC<ProjectsPageProps> = ({
    projects,
    technologyNames,
}) => {
    const [filteredProjects, setFilteredProjects] = useState(projects)
    const [selectedTechnology, setSelectedTechnology] = useState('')

    const filterProjectsByTechnology = (technologyName: string) => {
        if (technologyName == selectedTechnology) {
            setFilteredProjects(projects)
            setSelectedTechnology('')
        } else {
            setFilteredProjects(
                projects.filter((project) => {
                    for (const techno of project.technologies) {
                        if (techno.name.toLowerCase() === technologyName) {
                            return true
                        }
                    }
                    return false
                })
            )
            setSelectedTechnology(technologyName)
        }
    }

    return (
        <React.Fragment>
            <Head>
                <title>{useTranslate('title', 'projects')}</title>
                <meta
                    name="description"
                    content={useTranslate('meta_description', 'projects')}
                />
                <meta name="robots" content="index, follow" />
                <link
                    rel="canonical"
                    href={`https://aurelienbrabant.fr/projects`}
                />

                <meta
                    property="og:url"
                    content="https://aurelienbrabant.fr/projects"
                />
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content={useTranslate('title', 'projects')}
                />
                <meta
                    property="og:description"
                    content={useTranslate('meta_description', 'projects')}
                />
                <meta property="og:image" content="/og-landing.webp" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content="aurelienbrabant.fr" />
                <meta
                    property="twitter:url"
                    content="https://aurelienbrabant.fr/projects"
                />
                <meta
                    name="twitter:title"
                    content={useTranslate('title', 'projects')}
                />
                <meta
                    name="twitter:description"
                    content={useTranslate('meta_description', 'projects')}
                />
                <meta name="twitter:image" content="/og-landing.webp" />
            </Head>
            <Container className={styles.projectHeader} limitedWidth={false}>
                <h1> My projects </h1>
                <h3>
                    {' '}
                    Explore {filteredProjects.length} project
                    {filteredProjects.length > 1 && 's'}{' '}
                    {selectedTechnology !== '' &&
                        `sorted by "${selectedTechnology}"`}{' '}
                </h3>

                <div className={styles.sortByTechnology}>
                    {technologyNames.map((technology) => (
                        <a
                            key={technology}
                            onClick={() => {
                                filterProjectsByTechnology(
                                    technology.toLowerCase()
                                )
                            }}
                            className={
                                technology.toLocaleLowerCase() ==
                                selectedTechnology
                                    ? styles.selected
                                    : ''
                            }
                        >
                            <span>{technology}</span>
                        </a>
                    ))}
                </div>
            </Container>
            <Container limitedWidth={false} className={styles.projectContainer}>
                <Container size={'lg'}>
                    <div className={styles.projectsWrapper}>
                        {filteredProjects.map((project) => (
                            <Fade key={project.projectId}>
                                <div className={`${styles.projectCard}`}>
                                    <div className={styles.cardDecoration}>
                                        <h2>{project.name}</h2>
                                        <i className={styles.closeButton} />
                                        <i className={styles.minimizeButton} />
                                        <i
                                            className={styles.fullscreenButton}
                                        />
                                    </div>
                                    <div
                                        className={`${styles.projectCardContent}`}
                                    >
                                        <Link
                                            href={`/projects/${project.stringId}`}
                                        >
                                            <a>
                                                <BackgroundImage
                                                    src={project.coverURI}
                                                    backgroundColor={
                                                        'rgba(20, 20, 20, .9)'
                                                    }
                                                />
                                                <div
                                                    className={
                                                        styles.backgroundText
                                                    }
                                                >
                                                    <h3>
                                                        {project.description}
                                                    </h3>
                                                    <div
                                                        className={
                                                            styles.technologies
                                                        }
                                                    >
                                                        {project.technologies.map(
                                                            (technology) => (
                                                                <div
                                                                    key={
                                                                        technology.name
                                                                    }
                                                                >
                                                                    <img
                                                                        alt={`made with ${technology.name}`}
                                                                        src={
                                                                            technology.logoURI
                                                                        }
                                                                    />
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </Fade>
                        ))}
                    </div>
                </Container>
            </Container>
        </React.Fragment>
    )
}

export default Projects
