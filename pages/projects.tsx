import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Container } from '../components/container/container'
import projects from '../data/projects'
import { technologies, getTechnology } from '../data/technologies'
import Fade from 'react-reveal/Fade'
import type { Project } from '../data/projects'
import Link from 'next/link'
import Head from 'next/head'

import styles from '../styles/projects.module.scss'
import BackgroundImage from '../components/BackgroundImage'

const Projects: NextPage = () => {
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
    const [selectedTechnology, setSelectedTechnology] = useState<string>('')
    const sanitizedProjects = projects.map((project) => {
        project.technologies = project.technologies.map((technology) =>
            technology.toLowerCase()
        )
        return project
    })

    useEffect(() => {
        setFilteredProjects(sanitizedProjects)
        //eslint-disable-next-line
    }, [])

    const filterProjectsByTechnology = (technologyName: string) => {
        if (technologyName == selectedTechnology) {
            setFilteredProjects(sanitizedProjects)
            setSelectedTechnology('')
        } else {
            setFilteredProjects(
                sanitizedProjects.filter((project) =>
                    project.technologies.includes(technologyName)
                )
            )
            setSelectedTechnology(technologyName)
        }
    }

    return (
        <React.Fragment>
            <Head>
                <title> Projects | Aurelien Brabant </title>
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
                    {technologies
                        .filter((technology) => !technology.isTool)
                        .map((technology) => (
                            <a
                                key={technology.name}
                                onClick={() => {
                                    filterProjectsByTechnology(
                                        technology.name.toLowerCase()
                                    )
                                }}
                                className={
                                    technology.name.toLocaleLowerCase() ==
                                    selectedTechnology
                                        ? styles.selected
                                        : ''
                                }
                            >
                                {technology.name}
                            </a>
                        ))}
                </div>
            </Container>
            <Container limitedWidth={false} className={styles.projectContainer}>
                <Container size={"lg"}>
                    <div className={styles.projectsWrapper}>
                        {filteredProjects.map((project) => (
                            <Fade key={project.id}>
                                <div
                                    className={`${styles.projectCard}`}
                                >
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
                                        <Link href={`/projects/${project.id}`}>
                                            <a>
                                                <BackgroundImage src={project.illustration} backgroundColor={'rgba(20, 20, 20, .9)'} />
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
                                                                        technology
                                                                    }
                                                                >
                                                                    <img
                                                                        alt={`made with ${technology}`}
                                                                        src={
                                                                            getTechnology(
                                                                                technology
                                                                            )
                                                                                ?.imageUrl
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
