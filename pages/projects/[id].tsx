import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import MarkdownRenderer from '../../components/MarkdownRenderer'
import { Container } from '../../components/container/container'
import styles from '../../styles/project.module.scss'
import ExternalLink from '../../components/external-link/ExternalLink'

import { BsGithub } from 'react-icons/bs'
import { SiGitlab } from 'react-icons/si'

export const getServerSideProps: GetServerSideProps = async (context) => {
    let project: BrabantApi.Project | undefined = undefined

    if (context.params) {
        const res = await fetch(
            `http://${process.env.API_HOST}:${
                process.env.API_PORT
            }/projects/search?by=string_id&payload=${(
                context.params.id as string
            ).toLowerCase()}`
        )

        if (res.status != 200) {
            return {
                notFound: true,
            }
        }

        project = await res.json()
    }

    return {
        props: {
            project,
        },
    }
}

type ProjectPageProps = {
    project: BrabantApi.Project
}

const SourceCodeLink: React.FC<{
    platform: 'gitlab' | 'github'
    link: string | null
}> = ({ platform, link, children }) => {
    const className = `${
        platform === 'github' ? styles.githubLink : styles.gitlabLink
    } ${styles.sourceCodeLink}`

    if (!link) {
        return (
            <div className={className} style={{ opacity: 0.3 }}>
                {children}
            </div>
        )
    }

    return (
        <ExternalLink href={link} className={className}>
            {children}
        </ExternalLink>
    )
}

const ProjectPage: NextPage<ProjectPageProps> = ({ project }) => {
    return (
        <React.Fragment>
            <Head>
                <title> {project.name} | Aurelien Brabant </title>
                <meta name="description" content={project.description} />
                <meta name="robots" content="index, follow" />
                <link
                    rel="canonical"
                    href={`https://aurelienbrabant.fr/projects/${project.stringId}`}
                />

                <meta
                    property="og:url"
                    content={`https://aurelienbrabant.fr/projects/${project.stringId}`}
                />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={project.name} />
                <meta property="og:description" content={project.description} />
                <meta property="og:image" content={project.coverURI} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content="aurelienbrabant.fr" />
                <meta
                    property="twitter:url"
                    content={`https://aurelienbrabant.fr/projects/${project.stringId}`}
                />
                <meta name="twitter:title" content={project.name} />
                <meta
                    name="twitter:description"
                    content={project.description}
                />
                <meta name="twitter:image" content={project.coverURI} />
            </Head>
            <Container
                className={styles.projectHeader}
                edgePadded={false}
                limitedWidth={false}
            >
                <h1> {project.name} </h1>
                <h2> {project.description} </h2>
                <div className={styles.sourceCodeWrapper}>
                    <SourceCodeLink
                        platform="github"
                        link={
                            project.githubLink
                                ? `https://github.com/${project.githubLink}`
                                : null
                        }
                    >
                        <BsGithub /> <span>See the code on Github</span>
                    </SourceCodeLink>
                    <SourceCodeLink
                        platform="gitlab"
                        link={
                            project.gitlabLink
                                ? `https://github.com/${project.githubLink}`
                                : null
                        }
                    >
                        <SiGitlab /> <span>See the code on Gitlab</span>
                    </SourceCodeLink>
                </div>
            </Container>
            <Container
                edgePadded={false}
                limitedWidth={false}
                className={styles.projectContainer}
            >
                <div
                    className={styles.banner}
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, .9),rgba(0, 0, 0, 0.85)), url('${project.coverURI}')`,
                    }}
                >
                    <div className={styles.bannerContent}>
                        <div className={styles.technologyIcons}>
                            {project.technologies.map((technology) => (
                                <img
                                    key={technology.name}
                                    src={technology.logoURI}
                                    alt={technology.name}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <Container className={styles.projectContent}>
                    <MarkdownRenderer>{project.content}</MarkdownRenderer>
                </Container>
            </Container>
        </React.Fragment>
    )
}

export default ProjectPage
