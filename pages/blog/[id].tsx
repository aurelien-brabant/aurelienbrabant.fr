import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { strip } from '../../lib/strip';

import ReactMarkdown from "react-markdown";

import {
	CodeBlock as MarkdownCodeBlock,
	Image as MarkdownImage,
	AnchorHeading as MarkdownHeading,
	InlineCode as MarkdownInlineCode, 
	Anchor,
	Blockquote
} from '../../components/markdown/Markdown';

import { getPostsId, getPostData } from "../../lib/posts";

import {Container} from '../../components/container/container'

import styles from '../../styles/blog/id.module.css';

type PostData = {
	content: string;
	title: string;
	id: string;
	date: string;
	preview: string;
}

type NestedHeading = {
	id: string | undefined;
	title: string | undefined;
	nested: NestedHeading[];
	headingLevel: number;
}

const fromHTMLToNestedHeading = (el: HTMLElement): NestedHeading | null =>
	{
	if (el.nodeName[0] === "H" && el.nodeName.length === 2) {
		const level = parseInt(el.nodeName[1]);

		return {
			id: el.id,
			title: el.innerText,
			nested: [],
			headingLevel: level,
		};

	} else return null;
}

const insertNestedHeading = (tree: NestedHeading[], el: NestedHeading, level: number) =>
	{
	if (el.headingLevel > level) {
		insertNestedHeading(tree[tree.length - 1].nested, el, level + 1);
	} else {
		tree.push(el);
	}
}

const insertNestedHeadingIter = (head: NestedHeading[], inserted: NestedHeading) =>
	{
	let level = 1;
	let	target: NestedHeading[] = head;

	while (inserted.headingLevel > level) {
		++level;
		target = target[target.length - 1].nested;
	}
	target.push(inserted);
}

const useMarkdownHeadingsData = () => {
	const [ markdownHeadings, setMarkdownHeadings ] = useState<NestedHeading[]>([]);

	useEffect(() => {
		const headingElements: HTMLElement[] = Array.from(document.querySelectorAll('.markdown-heading'));
		const nestedHeadings: NestedHeading[] = [];

		for (const headingElement of headingElements) {
			const nested = fromHTMLToNestedHeading(headingElement);

			if (nested) insertNestedHeadingIter(nestedHeadings, nested);
		}
		setMarkdownHeadings(nestedHeadings);
	}, []);

	return markdownHeadings;
}

const Headings: React.FC<{ nested: NestedHeading[], level: number }> = ({ nested, level }) =>
{
	return <>{nested.map(el => (
		<React.Fragment key={el.id}>
			<div
				onClick={(e) => {
					e.preventDefault();
					document.querySelector(`#${el.id}`)!.scrollIntoView({ behavior: "smooth" });
				}}
				className={styles[`heading${level}`]}
			>
				{el.title}
			</div>
			{ el.nested.length > 0 && (
				<Headings nested={el.nested} level={level + 1} />
			)}
		</React.Fragment>
	))}
	</>

}

const Post: React.FC<{ postData: PostData }> = ({ postData }) =>
	{
	const tmp = postData.content.match(/(\w+)/g);
	const readTime = tmp ? Math.floor(tmp.length / 210) : 0;

	const headings = useMarkdownHeadingsData();

	return (
		<React.Fragment>
			<Head>
				<title>{postData.title}</title>
				<meta name="description" content={postData.preview} />
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
						rgbaColor: `rgba(0, 0, 0, .8)`
					}}
				>
					<h1> {postData.title} </h1>
					<h3> {readTime} min. read </h3>
					<h3> {postData.date} </h3>
				</Container>
				<Container
					className={styles.contentContainer}
					limitedWidth={true}
				>

					{ /* MARKDOWN RENDERING */ }

					<div className={styles.markdownWrapper}>
						<ReactMarkdown
							components={{
								// eslint-disable-next-line react/display-name
								code: ({children, inline, className}) => {
									const match = /language-(\w+)/.exec(className || '')
									return match && !inline ? (
										<MarkdownCodeBlock language={match[1]}>{children}</MarkdownCodeBlock>
									) : (
										<MarkdownInlineCode>{children}</MarkdownInlineCode>
									);
								},

								// eslint-disable-next-line react/display-name
								img: ({ src, alt }) => (
									<MarkdownImage src={`/blog/${postData.id}/${src}`} alt={alt} />
								),

								// eslint-disable-next-line react/display-name
								h1: ({ children, level }) => {
									return (
										<MarkdownHeading headingLevel={level}>{children}</MarkdownHeading>
									);
								},

								// eslint-disable-next-line react/display-name
								h2: ({ children, level }) => (
									<MarkdownHeading headingLevel={level}>{children}</MarkdownHeading>
								),

								// eslint-disable-next-line react/display-name
								h3: ({ children, level }) => (
									<MarkdownHeading headingLevel={level}>{children}</MarkdownHeading>
								),

								// eslint-disable-next-line react/display-name
								p: ({ children, ...props }) =>
									{
									return children[0] && typeof children[0] === 'object' && (children[0] as any).type.name === "img" ? (
										<div {...props}>
											{children}
										</div>
									) : (
										<p {...props}>
											{children}
										</p>
									)
								},

								// eslint-disable-next-line react/display-name
								a: ({ children, href, target }) => <Anchor href={href} target={target}>{children}</Anchor>,

								// eslint-disable-next-line react/display-name
								blockquote: ({ children }) => <Blockquote>{children}</Blockquote>

							}}
						>
							{postData.content}
						</ReactMarkdown>
					</div>

					<nav
						className={styles.sidenav}
					>
						{headings && <Headings nested={headings} level={1} />}
					</nav>

				</Container>
			</Container>
		</React.Fragment>
	);
}

export default Post;

export async function getStaticPaths() {
	const paths = getPostsId();
	return {
		paths,
		fallback: false,
	}
}

export async function getStaticProps({ params }: { params: { id: string } }) {
	const postData = getPostData(params.id);
	return {
		props: {
			postData,
		}
	};
}
