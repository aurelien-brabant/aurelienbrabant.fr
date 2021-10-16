import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Container } from "../components/container/container";
import OsWindow from "../components/os-window/OsWindow";
import styles from '../styles/Projects.module.css';
import projects from '../data/projects';
import { technologies, getTechnology } from '../data/technologies';
import Fade from 'react-reveal/Fade'
import type { Project } from '../data/projects';

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
            <Container
                className={styles.projectHeader}
                limitedWidth={false}
            >
                <h1> My projects </h1>
                <h2> Explore my {projects.length} projects </h2>
                <h5> Sort by technology: </h5>
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
                                <OsWindow title={project.name} contentClassName={styles.projectCard}>
                                    <div className={styles.image} style={{ backgroundImage: `url('${project.illustration}')` }} />
                                    <div className={styles.backgroundText}>
                                        <h3>{project.description}</h3>
                                        <div className={styles.technologies}>
                                            {project.technologies.map(technology =>
                                                <div><img key={technology} alt={`made with ${technology}`} src={getTechnology(technology)?.imageUrl} /></div>
                                            )}
                                        </div>
                                    </div>
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