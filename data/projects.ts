export type Project = {
	name: string;
	description: string;
	about: string;
	technologies: string[];
	githubLink?: string;
	tags: string[]; /* not used for now */
	illustration?: string;
};

const projects: Project[] = [
	{
		name: "minishell",
		description: "A simple UNIX shell built with pure C",
		about: "Minishell is a project we did in a team of two, as part of 42 school's curriculum. The purpose of this project was to learn about critical computer science concepts such as inter-process communication, kernel signals, as well as grammatical analysis of input through lexing and parsing.",
		technologies: ["C"],
		githubLink: "https://github.com/aurelien-brabant/minishell",
		tags: ["42 common-core"],
		illustration: "/projects/minishell.jpg"
	},
	{
		name: "aurelienbrabant.fr",
		description: "My own website, built on top of modern web technologies",
		about: "About my website",
		technologies: ["HTML5", "CSS3", "JavaScript", "TypeScript", "ReactJS", "NextJS", "NodeJS", "Docker"],
		githubLink: "https://github.com/aurelien-brabant/",
		tags: ["Web", "Personal"],
		illustration: "/aurelien.jpg"
	},
	{
		name: "MyFiche.fr V2",
		description: "A web project that hosted short and pedagocical summaries of high school courses",
		about: "This project actually sucks",
		technologies: ["HTML5", "NodeJS", "JavaScript", "MongoDB"],
		tags: ["Web", "Personal"],
		illustration: "/projects/myfiche.png"
	},
	{
		name: "Inception",
		description: "A DevOps project from the 42 curriculum, making use of docker, wordpress, nginx and much more",
		about: "There is something here probably",
		technologies: ["docker", "bash", "wordpress", "Linux"],
		tags: ["42 common-core", "DevOps"],
		illustration: "/projects/inception.jpg"
	},
	{
		name: "Libft",
		description: "My very own C library full of useful functions and utilities",
		about: "There is something here probably",
		technologies: ["C"],
		tags: ["42 common-core"],
		illustration: "/projects/libft.jpg"
	},
	{
		name: "Cub3D",
		description: "A modest clone of Wolf3D using the raycasting principle",
		about: "There is something here probably",
		technologies: ["C"],
		tags: ["42 common-core"],
		illustration: "/projects/cub3d.png"
	},
	{
		name: "Libasm",
		description: "An introduction to x86_64 assembly",
		about: "There is something here probably",
		technologies: ["NASM"],
		tags: ["42 common-core"],
		illustration: "/projects/libasm.jpg"
	},
	{
		name: "Github Finder",
		description: "A tiny serverless React App playing with the GitHub API",
		about: "There is something here probably",
		technologies: ["HTML5", "JavaScript", "ReactJS"],
		tags: ["Personal"],
		illustration: "/projects/github-finder.jpg"
	},
	{
		name: "Contact Keeper",
		description: "A little React contact managing app dealing with a NodeJS backend",
		about: "There is something here probably",
		technologies: ["HTML5", "JavaScript", "ReactJS", "NodeJS", "MongoDB"],
		tags: ["Personal"],
		illustration: "/projects/contact-keeper	.jpg"
	},
	{
		name: "ft_containers",
		description: "Clones of some containers from the standard C++ library, made for learning purposes (C++98) ",
		about: "There is something here probably",
		technologies: ["C++"],
		tags: ["Personal"],
		illustration: "/projects/ft_containers.jpg"
	},
	{
		name: "Partylens API",
		description: "RESTful API built with NestJS for a web app designed to organize and schedule parties (POC)",
		about: "There is something here probably",
		technologies: ["TypeScript", "NestJS", "Docker"],
		tags: ["Personal"],
		illustration: "/projects/partylens_api.jpg"
	},
]

export default projects;