import React, { useState, useEffect } from "react";
import Head from "next/head";

import ReactMarkdown from "react-markdown";

import {
	CodeBlock as MarkdownCodeBlock,
	Image as MarkdownImage,
	AnchorHeading as MarkdownHeading,
	InlineCode as MarkdownInlineCode,
	Anchor,
	Blockquote,
} from "../../components/markdown/Markdown";

import { getPosts, getPost, BlogPost } from "../../lib/posts";

import { Container } from "../../components/container/container";

import styles from "../../styles/blog/id.module.css";

type NestedHeading = {
	id: string | undefined;
	title: string | undefined;
	nested: NestedHeading[];
	headingLevel: number;
};

/* ------ HELPERS ------ */

const fromHTMLToNestedHeading = (el: HTMLElement): NestedHeading | null => {
	if (el.nodeName[0].toLowerCase() === "h" && el.nodeName.length === 2) {
		const level = el.nodeName.charCodeAt(1) - 48;

		return {
			id: el.id,
			title: el.innerText,
			nested: [],
			headingLevel: level,
		};
	}

	return null; /* not an HTML heading */
};

const insertNestedHeading = (
	head: NestedHeading[],
	inserted: NestedHeading
) => {
	let level = 1;
	let target: NestedHeading[] = head;

	while (inserted.headingLevel > level) {
		++level;
		target = target[target.length - 1].nested;
	}
	target.push(inserted);
};

const useMarkdownNestedHeadings = () => {
	const [markdownHeadings, setMarkdownHeadings] = useState<NestedHeading[]>(
		[]
	);

	useEffect(() => {
		const headingElements: HTMLElement[] = Array.from(
			document.querySelectorAll(".markdown-heading")
		);
		const nestedHeadings: NestedHeading[] = [];

		for (const headingElement of headingElements) {
			const nested = fromHTMLToNestedHeading(headingElement);

			if (nested) insertNestedHeading(nestedHeadings, nested);
		}
		setMarkdownHeadings(nestedHeadings);
	}, []);

	return markdownHeadings;
};

/* TableOfContents Headings */

const TOCHeadings: React.FC<{ headings: NestedHeading[]; level: number }> = ({
	headings,
	level,
}) => {
	return (
		<React.Fragment>
			{headings.map((el) => (
				<React.Fragment key={el.id}>
					<div
						onClick={(e) => {
							e.preventDefault();
							document
								.querySelector(`#${el.id}`)!
								.scrollIntoView({ behavior: "smooth" });
						}}
						style={{
							marginLeft: `${10 * (level - 1)}px`,
							marginBottom: `${15 / level}px`,
							marginTop: `${15 / level}px`,
						}}
						className={styles[`heading${level}`]}
					>
						{el.title}
					</div>
					{
						/* render subheadings recursively */
						el.nested.length > 0 && (
							<TOCHeadings
								headings={el.nested}
								level={level + 1}
							/>
						)
					}
				</React.Fragment>
			))}
		</React.Fragment>
	);
};

TOCHeadings.defaultProps = { level: 1 };

const TableOfContents: React.FC<{ headings: NestedHeading[] }> = ({
	headings,
}) => {
	return (
		<nav className={styles.sidenav}>
			<TOCHeadings headings={headings} level={1} />
		</nav>
	);
};

const Post: React.FC<{ postData: BlogPost }> = ({ postData }) => {
	const tmp = postData.content.match(/(\w+)/g);
	const readTime = tmp ? Math.floor(tmp.length / 210) : 0;

	const headings = useMarkdownNestedHeadings();

	return (
		<React.Fragment>
			<Head>
				<title>{postData.meta.title}</title>
				<meta name="description" content={postData.meta.preview} />
				<meta name="robots" content="index, follow" />
			</Head>
			<Container
				limitedWidth={false}
				className={styles.mainContainer}
				edgePadded={false}
			>
				<Container
					className={styles.headingContainer}
					limitedWidth={false}
					edgePadded={false}
					backgroundImage={{
						url: `/blog/covers/${postData.id}.png`,
						rgbaColor: `rgba(0, 0, 0, .8)`,
					}}
				>
					<h1> {postData.meta.title} </h1>
					<h3> {readTime} min. read </h3>
					<h3> {postData.meta.dateString} </h3>
				</Container>
				<Container
					className={styles.contentContainer}
					limitedWidth={true}
				>
					{/* MARKDOWN RENDERING */}

					<div className={styles.markdownWrapper}>
						<ReactMarkdown
							components={{
								// eslint-disable-next-line react/display-name
								code: ({ children, inline, className }) => {
									const match = /language-(\w+)/.exec(
										className || ""
									);
									return match && !inline ? (
										<MarkdownCodeBlock language={match[1]}>
											{children}
										</MarkdownCodeBlock>
									) : (
										<MarkdownInlineCode>
											{children}
										</MarkdownInlineCode>
									);
								},

								// eslint-disable-next-line react/display-name
								img: ({ src, alt }) => (
									<MarkdownImage
										src={`/blog/${postData.id}/${src}`}
										alt={alt}
									/>
								),

								// eslint-disable-next-line react/display-name
								h1: ({ children, level }) => {
									return (
										<MarkdownHeading headingLevel={level}>
											{children}
										</MarkdownHeading>
									);
								},

								// eslint-disable-next-line react/display-name
								h2: ({ children, level }) => (
									<MarkdownHeading headingLevel={level}>
										{children}
									</MarkdownHeading>
								),

								// eslint-disable-next-line react/display-name
								h3: ({ children, level }) => (
									<MarkdownHeading headingLevel={level}>
										{children}
									</MarkdownHeading>
								),

								// eslint-disable-next-line react/display-name
								p: ({ children, ...props }) => {
									return children[0] &&
										typeof children[0] === "object" &&
										(children[0] as any).type.name ===
											"img" ? (
										<div {...props}>{children}</div>
									) : (
										<p {...props}>{children}</p>
									);
								},

								// eslint-disable-next-line react/display-name
								a: ({ children, href, target }) => (
									<Anchor href={href} target={target}>
										{children}
									</Anchor>
								),

								// eslint-disable-next-line react/display-name
								blockquote: ({ children }) => (
									<Blockquote>{children}</Blockquote>
								),
							}}
						>
							{postData.content}
						</ReactMarkdown>
					</div>
					<TableOfContents headings={headings} />
				</Container>
			</Container>
		</React.Fragment>
	);
};

export default Post;

export async function getStaticPaths() {
	const paths = getPosts().map((post) => ({
		params: {
			id: post.id,
		},
	}));

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }: { params: { id: string } }) {
	const postData = getPost(params.id);
	return {
		props: {
			postData,
		},
	};
}
