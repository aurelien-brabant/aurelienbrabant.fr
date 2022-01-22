import { GetServerSideProps } from 'next'
import React, { useEffect, useState } from 'react'
import { Container } from '../components/container/container'
import Head from 'next/head'
import Heading from '../components/heading'
import { BsArrowRight } from 'react-icons/bs'
import { VscGithub } from 'react-icons/vsc'
import { SiGitea, SiGitlab } from 'react-icons/si'

import styles from '../styles/projects.module.scss'
import { translate, useTranslate } from '../components/translator/Translator'
import UnderlinedText from '../components/UnderlinedText'
import CallToAction from '../components/CallToAction'
import { getFirstAvailable } from '../lib/misc'

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

const ProjectCardWrapper: React.FC<{ projectLink: string | null }> = ({
    children,
    projectLink,
}) => {
    return projectLink ? (
        <a target="_blank" rel="noreferrer" href={projectLink}>
            {children}
        </a>
    ) : (
        <React.Fragment>{children}</React.Fragment>
    )
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
                <title>{translate('fr', 'title', 'projects')}</title>
                <meta
                    name="description"
                    content={translate('fr', 'meta_description', 'projects')}
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
                    content={translate('fr', 'title', 'projects')}
                />
                <meta
                    property="og:description"
                    content={translate('fr', 'meta_description', 'projects')}
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
                    content={translate('fr', 'title', 'projects')}
                />
                <meta
                    name="twitter:description"
                    content={translate('fr', 'meta_description', 'projects')}
                />
                <meta name="twitter:image" content="/og-landing.webp" />
            </Head>
            <Heading title="projects" />
            {/*
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
                  */}
            <Container limitedWidth={false} className={styles.projectContainer}>
                <Container size={'lg'}>
                    <div className={styles.projectsWrapper}>
                        {filteredProjects.map((project) => (
                            <ProjectCardWrapper
                                projectLink={project.projectLink}
                            >
                                <div className={`${styles.projectCard}`}>
                                    <div className={styles.imageFrame}>
                                        <div className={styles.technologies}>
                                            {project.technologies.map(
                                                (techno) => (
                                                    <div
                                                        className={
                                                            styles.technoWrapper
                                                        }
                                                    >
                                                        <img
                                                            alt={`${techno.name} logo`}
                                                            src={techno.logoURI}
                                                            height="20px"
                                                            width="20px"
                                                        />
                                                    </div>
                                                )
                                            )}
                                        </div>
                                        <div className={styles.imageWrapper}>
                                            <img
                                                alt={`${project.name} decorative image`}
                                                src={project.coverURI}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.projectHeadingGroup}>
                                        <UnderlinedText
                                            as="h2"
                                            underlineColor="#e2725b"
                                        >
                                            {project.name}
                                        </UnderlinedText>
                                        <div className={styles.codeLinks}>
                                            {project.githubLink && (
                                                <a
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    href={`https://github.com/${project.githubLink}`}
                                                >
                                                    <VscGithub />
                                                </a>
                                            )}
                                            {project.gitlabLink && (
                                                <a
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    href={`https://gitlab.com/${project.gitlabLink}`}
                                                >
                                                    <SiGitlab />
                                                </a>
                                            )}
                                            {project.giteaLink && (
                                                <a
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    href={`https://git.aurelienbrabant.fr/${project.giteaLink}`}
                                                >
                                                    <SiGitea />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <p>{project.description}</p>
                                </div>
                            </ProjectCardWrapper>
                        ))}
                    </div>
                </Container>
            </Container>
        </React.Fragment>
    )
}

export default Projects
