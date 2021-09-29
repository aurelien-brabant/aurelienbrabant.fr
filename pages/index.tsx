import type { NextPage } from "next";
import React, { ReactNode } from "react";
import Head from "next/head";
import Image from "next/image";
import { Container } from "../components/container/container";
import { Button } from "../components/button/button";

import styles from "../styles/Home.module.css";
import "react-multi-carousel/lib/styles.css";
import { Card } from "../components/card/card";
import { landingPosts } from "../data/landing_posts";
import Link from "next/link";

type Technology = {
	name: string;
	imageUrl: string;
};

const Home: NextPage = () => {
	const renderLandingPosts = (): ReactNode => {
		return landingPosts.map((post) => (
			<Card
				key={post.title}
				title={post.title}
				subtitle={`Duration: about ${post.duration}`}
				description={post.description}
				onClickUrl={post.githubLink}
				imageCoverUrl={post.imageCoverUrl}
			/>
		));
	};

	const technologies: Technology[] = [
		{
			name: "HTML5",
			imageUrl: "/technologies/html.png",
		},
		{
			name: "CSS3",
			imageUrl: "/technologies/css.png",
		},
		{
			name: "JavaScript",
			imageUrl: "/technologies/javascript.png",
		},
		{
			name: "TypeScript",
			imageUrl: "/technologies/typescript.png",
		},
		{
			name: "NodeJS",
			imageUrl: "/technologies/nodejs.png",
		},
		{
			name: "NextJS",
			imageUrl: "/technologies/nextjs.png",
		},
		{
			name: "ReactJS",
			imageUrl: "/technologies/react.png",
		},
		{
			name: "NestJS",
			imageUrl: "/technologies/nestjs.svg",
		},
		{
			name: "Docker",
			imageUrl: "/technologies/docker.png",
		},
		{
			name: "C",
			imageUrl: "/technologies/c.png",
		},
		{
			name: "C++",
			imageUrl: "/technologies/cpp.png",
		},
		{
			name: "Git",
			imageUrl: "/technologies/git.png",
		},
		{
			name: "Vim",
			imageUrl: "/technologies/vim.png",
		},
		{
			name: "MacOS",
			imageUrl: "/technologies/apple.png",
		},
		{
			name: "Linux",
			imageUrl: "/technologies/tux.png",
		},
		{
			name: "Notion",
			imageUrl: "/technologies/notion.png",
		},
	];

	return (
		<React.Fragment>
			<Head>
				<title>Web developer | Aurélien Brabant</title>
				<meta
					name="description"
					content="My name is Aurélien, I'm a web developer. Need your own website done right? Let's get in touch!"
				/>
				<meta name="robots" content="index, follow" />
			</Head>

			{/* Introduction - Landing page */}

			<Container
				backgroundImage={{
					url: "/landing_bg.jpeg",
					rgbaColor: "rgba(20, 20, 20, 0.97)",
				}}
				limitedWidth={false}
			>
				<Container className={styles.mainContainer}>
					<Image
						src={"/aurelien.jpg"}
						alt={"Photo of Aurelien"}
						height={170}
						width={170}
						className={styles.aurelienPhoto}
					/>

					<div className={styles.introduction}>
						<h1 className={styles.introduction}>
							Hi, I'm Aurelien
						</h1>

						<h3>
							I make websites and write about programming and
							GNU/Linux stuff
						</h3>

						<p className={styles.activity}>
							I'm currently learning programming at{" "}
							<a href="https://42.fr" target="_blank">
								42 Paris
							</a>
							, where I mainly concentrate on C and C++
							programming. I'm also building blazing fast, modern
							and reliable websites using{" "}
							<span className={styles.emphase}>NodeJS</span> and{" "}
							<span className={styles.emphase}>Typescript</span>
						</p>

						<div className={styles.socials}>
							<a
								href="https://twitter.com/aurelienb42"
								target="_blank"
								rel="noreferrer"
							>
								<svg
									role="img"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<title>Twitter</title>
									<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
								</svg>
							</a>
							<a
								href="https://github.com/aurelien-brabant"
								target="_blank"
								rel="noreferrer"
							>
								<svg
									role="img"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<title>GitHub</title>
									<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
								</svg>
							</a>
							<a
								href="https://www.linkedin.com/in/aurelien-brabant"
								target="_blank"
								rel="noreferrer"
							>
								<svg
									role="img"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<title>LinkedIn</title>
									<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
								</svg>
							</a>
							<a
								href="https://www.youtube.com/channel/UC9JjIHlcttAz6QJTVjVxsdg"
								target="_blank"
								rel="noreferrer"
							>
								<svg
									role="img"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<title>YouTube</title>
									<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
								</svg>
							</a>
						</div>
					</div>
				</Container>

				<div className={styles.introductionCurve}>
					<svg
						data-name="Layer 2"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 1200 120"
						preserveAspectRatio="none"
					>
						<path
							d="M322.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
							className={styles.shapeFill}
						></path>
					</svg>
				</div>
			</Container>

			{/* TECHNOLOGIES */}

			<Container className={styles.backgroundCareer} limitedWidth={false}>
				<Container className={styles.technologiesContainer}>
					<h2> You and I love technology, right ? </h2>
					<h3> Here are some of the technologies I use </h3>
					<div className={styles.technologies}>
						{technologies.map((technology) => (
							<div>
								<img
									key={technology.name}
									alt={technology.name}
									src={technology.imageUrl}
								/>
							</div>
						))}
					</div>
					<div className={styles.cta}>
						<h2> Interested in my skills? </h2>
						<Link href="/soon">
							<a>{"Let's get in touch!"}</a>
						</Link>
					</div>
				</Container>
			</Container>

			<Container
				limitedWidth={false}
				backgroundImage={{
					url: "/spyglass.jpeg",
					rgbaColor: "rgba(0, 0, 0, 0.85)",
				}}
				className={styles.blogSection}
			>
				<Container className={styles.textCtaSection}>
					<h2 className={styles.title}>
						{" "}
						We need programming stories{" "}
					</h2>

					<p>
						{" "}
						Stories are great, but programming ones are even
						greater.
					</p>

					<Button href="/blog" className={styles.ctaButton}>
						Check out my blog
					</Button>
				</Container>
			</Container>
		</React.Fragment>
	);
};

export default Home;
