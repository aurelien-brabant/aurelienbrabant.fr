import React from 'react';
import Head from 'next/head';

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

const Post: React.FC<{ postData: PostData }> = ({ postData }) =>
{
	const tmp = postData.content.match(/(\w+)/g);
	const readTime = tmp ? Math.floor(tmp.length / 210) : 0;

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
					fillPageHeight={true}
				>
					{ /* MARKDOWN RENDERING */ }

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
							h1: ({ children, level }) => (
								<MarkdownHeading headingLevel={level}>{children}</MarkdownHeading>
							),

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
