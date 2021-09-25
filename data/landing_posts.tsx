type LandingPost = {
	title: string;
	duration: string;
	imageCoverUrl: string;
	description: string;
	githubLink?: string;
}

export const landingPosts: LandingPost[] = [
	{
		title:'Cub3D',
		duration: '2 months',
		imageCoverUrl: '/cub3d_preview.png',
		description: "Using the raycasting principle, I created a simple clone of the well known wolfenstein 3D game from the 90's",
		githubLink: 'https://github.com/aurelien-brabant/cub3d'
	},
	{
		title:'minishell',
		duration: '1 month',
		imageCoverUrl: '/minishell_preview.jpeg',
		description: `my first teamwork project. we've recreated a simple unix command line interpreter, also known as "shell".`,
		githubLink: 'https://github.com/aurelien-brabant/minishell'
	},
	{
		title:'inception',
		duration: '1 week',
		imageCoverUrl: '/inception_preview.png',
		description: `setup a wordpress installation working with a mariadb database, plus additional services such as redis, using docker and docker-compose.`,
		githubLink: 'https://github.com/aurelien-brabant/inception'
	},
	{
		title:'libft',
		duration: '10 months',
		imageCoverUrl: '/libft_preview.jpg',
		description: `My very own C programming library, that I've wrote to help me write elegant and efficient C code during the first part of my cursus at 42. I'm very proud of it as it has a lot of useful stuff in it.`,
		githubLink: 'https://github.com/aurelien-brabant/libft'
	},
]
