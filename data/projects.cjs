module.exports = [
	{
		id: "partylens-api",
		name: "Partylens API",
		description: "RESTful API built with NestJS for a web app designed to organize and schedule parties (POC)",
		about: "A RESTFul API built with the NestJS TypeScript framework, originally designed for a web application designed to plan and schedule nocturn events.",
		technologies: ["TypeScript", "NestJS", "Docker"],
		tags: ["Personal"],
		illustration: "/projects/partylens_api.jpg",
		learned: [
			"TypeScript",
			"NestJS",
			"API documentation generation with Swagger",
			"JavaScript/TypeScript unit and end-to-end testing using Jest"
		]
	},

	{
		id: "aurelienbrabant",
		name: "aurelienbrabant.fr",
		description: "My own website, built on top of modern web technologies",
		about: "My personal website, acting as a blog and a portfolio. Serverless at the moment, but makes use of NextJS to statically build HTML.",
		technologies: ["HTML5", "CSS3", "NextJS", "JavaScript", "TypeScript", "ReactJS", "NodeJS", "Docker"],
		githubLink: "https://github.com/aurelien-brabant/aurelienbrabant.fr-v2",
		tags: ["Web", "Personal"],
		illustration: "/projects/aurelienbrabant.fr.jpg",
		learned: [
			"ReactJS TypeScript integration",
			"Multi language system with partial support",
			"Pure CSS, no framework",
			"Search engine optimization: canonical/meta tags, automated sitemap generation",
			"RSS feed automatic generation for the blog",
			"Blog rendered from a list of markdown posts with syntax highlighting support",
		]
	},
	{
		id: "github-finder",
		name: "Github Finder",
		description: "A tiny serverless React App playing with the GitHub API",
		about: "A React project that plays with the GitHub API which I did when learning about React.",
		technologies: ["HTML5", "JavaScript", "ReactJS"],
		tags: ["Personal"],
		illustration: "/projects/github-finder.jpg",
		learned: [
			"ReactJS fundamentals: class/functional components, lifecycle, state, props, re-render",
			"Build a modern ReactJS program architecture",
			"React Hooks",
			"React Context API",
			"HTTP request/response",
			"Deployment to Heroku"
		]
	},
	{
		id: "contact-keeper",
		name: "Contact Keeper",
		description: "A little React contact managing app dealing with a NodeJS backend",
		about: "A simple app that stores a list of contacts and implements user authentication, built with the MERN stack.",
		technologies: ["HTML5", "JavaScript", "ReactJS", "NodeJS", "MongoDB"],
		tags: ["Personal"],
		illustration: "/projects/contact-keeper.jpg",
		learned: [
			"Build a RESTful API",
			"Process HTTP requests using the ExpressJS HTTP Framework",
			"Setup an authentication system using PassportJS",
			"Store data permanently in a MongoDB database",
			"Communication between the NodeJS backend and the ReactJS front-end",
			"Deployment to Netlify"
		]
	},
	{
		id: "myfiche-version-2",
		name: "MyFiche.fr V2",
		description: "A web project that hosted short and pedagocical summaries of high school courses",
		about: `Myfiche.fr was a tiny website we made with a friend when we were at high school. It was designed to help us summarize,
		learn, and remember critical notions about almost everything we learned in class. We maintained and added content to it during two years, before shutting
		it down as it was no longer used. During the year where I really started learning programming, I decided to rework the original version (made with php) to train my skills
		using ExpressJS, plain JavaScript, and MongoDB. While the codebase is really dirty (it was my first real web app after all), I think that the overall result wasn't too bad!`,
		technologies: ["HTML5", "NodeJS", "JavaScript", "MongoDB"],
		tags: ["Web", "Personal"],
		illustration: "/projects/myfiche.png",
		learned: [
			"JavaScripts basics",
			"ExpressJS JavaScript HTTP framework",
			"Interfacing with a NoSQL database (MongoDB)",
			"Bootstrap (styling)"
		]
	},
	{
		id: "inception",
		name: "Inception",
		description: "A DevOps project from the 42 curriculum, making use of docker, wordpress, nginx and much more",
		about: `Inception is a project from the 42 school's common-core curriculum, which's goal is to make us learn about application containerization through
		the use of docker and docker-compose. This project basically setups a bunch of interdependent services that all run in a separate docker container.`,
		technologies: ["docker", "bash", "wordpress", "Linux"],
		tags: ["42 common-core", "DevOps"],
		illustration: "/projects/inception.jpg",
		learned: [
			"Basic Linux system administration concepts",
			"Shell scripting",
			"Setup a network of docker containers using the docker-compose tool",
			"Setup an HTTP server (nginx) that is able to process php scripts",
			"Setup a preconfigured wordpress installation",
			"Setup Redis to work with the wordpress installation",
			"Setup MariaDB to work with the wordpress installation",
			"Setup a GUI front-end to manage the MariaDB database (adminer)",
			"Implement data persistence through the use of docker volumes",
		],
		githubLink: "https://github.com/aurelien-brabant/inception"
	},
	{
		id: "libft",
		name: "Libft",
		description: "My very own C library full of useful functions and utilities",
		about: `At 42 school, we are not allowed to use most of the functions provided by the C standard library. Instead, we are urged to
		implement ourselves any utility we'd need in future projects inside our very own library. While this is a very simple project as it is given originally, I decided to implement
		A LOT of additional functions in mine, such as abstract data types, generic sorting algorithms, command-line parsing utilities and much more. I also approached
		unit testing by writing more than 300 tests for all my functions.`,

		technologies: ["C"],
		tags: ["42 common-core"],
		illustration: "/projects/libft.jpg",
		learned: [
			"C programming fundamentals and advanced techniques such as '\"generic\" programming",
			"Basic understanding and implementation of sorting algorithms",
			"Basic understanding and implementation of data structures",
			"Introduction to unit testing (using the criterion testing framework)",
		],
		githubLink: "https://github.com/aurelien-brabant/libft"
	},
	{
		id: "minishell",
		name: "minishell",
		description: "A simple UNIX shell built with pure C",
		about: "Minishell is a project we did in a team of two, as part of 42 school's curriculum. The purpose of this project was to learn about critical computer science concepts such as inter-process communication, kernel signals, as well as grammatical analysis of input through lexing and parsing.",
		technologies: ["C"],
		githubLink: "https://github.com/aurelien-brabant/minishell",
		tags: ["42 common-core"],
		illustration: "/projects/minishell.jpg",
		learned: [
			"User input handling, featuring lexing and parsing",
			"Inter process communication (IPC) through the use of UNIX pipes",
			"UNIX processes lifetime and kernel signals",
			"Advanced C programming techniques",
			"Team work: use of git branches and GitHub pull requests"
		]
	},
	{
		id: "cub3d",
		name: "Cub3D",
		description: "A modest clone of Wolf3D using the raycasting principle",
		about: `Cub3D is a graphical programming project from the 42 school common-core curriculum, which is basically a really simplified clone of the well
		known Wolf3D game. By applying the raycasting principle, this project aims to create a textured fake 3D environment where a player can move and
		visualize sprites.`,
		technologies: ["C"],
		tags: ["42 common-core"],
		illustration: "/projects/cub3d.png",
		learned: [
			"Introduction to graphical programming using the XOrg version of the minilibX library",
			"Basic application of math concepts such as trigonometry in order to perform raycasting",
			"Manually setup a proper game loop with a Frame Per Second (FPS) indicator",
			"Handle mouse and keyboard events",
			"Display textures and sprites",
		],
		githubLink: "https://github.com/aurelien-brabant/cub3d"
	},
	{
		id: "libasm",
		name: "Libasm",
		description: "An introduction to x86_64 assembly",
		about: `A project from the 42 school common core curriculum that aims at making us understand how things work at the lowest level a programmer can approach.
		This project is basically about reimplementing some functions from the C library, but using the x86_64 assembly language instead.`,
		technologies: ["NASM"],
		tags: ["42 common-core"],
		illustration: "/projects/libasm.jpg",
		learned: [
			"x86_64 assembly language: Intel syntax, Netwide Assembler (NASM) compiler"
		]
	},

	{
		id: "ft-containers",
		name: "ft_containers",
		description: "Clones of some containers from the standard C++ library, made for learning purposes (C++98) ",
		about: `ft_containers is a project from the 42 school common core curriculum that aims at making us learn about C++ generic programming and data structures
		by reimplementing some of the standard library data structures such as vector, stack and map`,
		technologies: ["C++"],
		tags: ["Personal"],
		illustration: "/projects/ft_containers.jpg",
		githubLink: "https://github.com/aurelien-brabant/ft_containers",
		learned: [
			"Sequence containers (vector)",
			"Associative containers (map)",
			"Container Adapters (stack)",
			"Iterators / constant iterators",
			"C++ generic programming (templates)",
			"SFINAE (Substitution Failure Is Not An Error)",
		]
	},

];