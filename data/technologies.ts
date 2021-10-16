export type Technology = {
    name: string;
    imageUrl: string;
    isTool: boolean;
};

export const technologies: Technology[] = [
    {
        name: "HTML5",
        imageUrl: "/technologies/html.png",
        isTool: false,
    },
    {
        name: "CSS3",
        imageUrl: "/technologies/css.png",
        isTool: false,
    },
    {
        name: "JavaScript",
        imageUrl: "/technologies/javascript.png",
        isTool: false,
    },
    {
        name: "TypeScript",
        imageUrl: "/technologies/typescript.png",
        isTool: false,
    },
    {
        name: "NodeJS",
        imageUrl: "/technologies/nodejs.png",
        isTool: false,
    },
    {
        name: "NextJS",
        imageUrl: "/technologies/nextjs.png",
        isTool: false,
    },
    {
        name: "ReactJS",
        imageUrl: "/technologies/react.png",
        isTool: false,
    },
    {
        name: "NestJS",
        imageUrl: "/technologies/nestjs.svg",
        isTool: false,
    },
    {
        name: "Docker",
        imageUrl: "/technologies/docker.png",
        isTool: false,
    },
    {
        name: "C",
        imageUrl: "/technologies/c.png",
        isTool: false,
    },
    {
        name: "C++",
        imageUrl: "/technologies/cpp.png",
        isTool: false,
    },
    {
        name: "Git",
        imageUrl: "/technologies/git.png",
        isTool: true,
    },
    {
        name: "Vim",
        imageUrl: "/technologies/vim.png",
        isTool: true,
    },
    {
        name: "MacOS",
        imageUrl: "/technologies/apple.png",
        isTool: true,
    },
    {
        name: "Linux",
        imageUrl: "/technologies/tux.png",
        isTool: false,
    },
    {
        name: "Gentoo",
        imageUrl: "/technologies/gentoo.png",
        isTool: true,
    },
    {
        name: "Notion",
        imageUrl: "/technologies/notion.png",
        isTool: true,
    },
    {
        name: "NASM",
        imageUrl: "/technologies/nasm.png",
        isTool: false,
    },
    {
        name: "wordpress",
        imageUrl: "/technologies/wordpress.png",
        isTool: false,
    },
    {
        name: "bash",
        imageUrl: "/technologies/bash.png",
        isTool: false,
    },
    {
        name: "MongoDB",
        imageUrl: "/technologies/mongodb.png",
        isTool: false
    }
];

export const getTechnology = (technologyName: string): Technology | null => {
    for (const technology of technologies) {
        if (technology.name.toLowerCase() === technologyName.toLocaleLowerCase()) {
            return technology;
        }
    }
    return null;
}