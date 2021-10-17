import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Container } from "../components/container/container";
import OsWindow from "../components/os-window/OsWindow";
import styles from '../styles/Projects.module.css';
import projects from '../data/projects';
import { technologies, getTechnology } from '../data/technologies';
import Fade from 'react-reveal/Fade'
import type { Project } from '../data/projects';
import Link from "next/link";
import Head from "next/head";

const Projects: NextPage = () => {
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [selectedTechnology, setSelectedTechnology] = useState<string>("");
    const sanitizedProjects = projects.map(project => {
        project.technologies = project.technologies.map(technology => technology.toLowerCase());
        return project;
    });

    useEffect(() => {
        setFilteredProjects(sanitizedProjects);
    }, [])

    const filterProjectsByTechnology = (technologyName: string) => {
        if (technologyName == selectedTechnology) {
            setFilteredProjects(sanitizedProjects);
            setSelectedTechnology("");
        } else {
            setFilteredProjects(sanitizedProjects.filter(project => project.technologies.includes(technologyName)));
            setSelectedTechnology(technologyName);
        }
    }


    return (
        <React.Fragment>
            <Head>
                <title> Projects | Aurelien Brabant </title>
            </Head>
            <Container
                className={styles.projectHeader}
                limitedWidth={false}
                
            >
                <h1> My projects </h1>
                <h2> Explore {filteredProjects.length} project{filteredProjects.length > 1 && 's'} {selectedTechnology !== '' && `sorted by "${selectedTechnology}"`} </h2>
                <div className={styles.sortByTechnology}>
                    {technologies.filter(technology => !technology.isTool).map(technology => (
                        <a onClick={() => { filterProjectsByTechnology(technology.name.toLowerCase()) }}
                            className={technology.name.toLocaleLowerCase() == selectedTechnology ? styles.selected : ''}
                        >{technology.name}</a>
                    ))}
                </div>

            </Container>
            <Container limitedWidth={false} className={styles.projectContainer}>
                <Container>
                    <div className={styles.projectWrapper} >
                        {filteredProjects.map(project => (
                            <Fade>
                                <OsWindow title={project.name} className={styles.projectCard} contentClassName={styles.projectCardContent}>
                                    <Link href={`/projects/${project.id}`}><a>
                                    <div className={styles.image} style={{ backgroundImage: `url('${project.illustration}')` }} />
                                    <div className={styles.backgroundText}>
                                        <h3>{project.description}</h3>
                                        <div className={styles.technologies}>
                                            {project.technologies.map(technology =>
                                                <div><img key={technology} alt={`made with ${technology}`} src={getTechnology(technology)?.imageUrl} /></div>
                                            )}
                                        </div>
                                    </div>
                                    </a></Link>
                                </OsWindow>
                            </Fade>
                        ))}
                    </div >
                </Container >
            </Container>
        </React.Fragment>
    );
}

export default Projects;