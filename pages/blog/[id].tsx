import React from 'react';

import ReactMarkdown from "react-markdown";

import {
	CodeBlock as MarkdownCodeBlock,
	Image as MarkdownImage,
	AnchorHeading as MarkdownHeading,
	InlineCode as MarkdownInlineCode 
} from '../../components/markdown/Markdown';

import { getPostsId, getPostData } from "../../lib/posts";

import {Container} from '../../components/container/container'

import styles from '../../styles/blog/id.module.css';

type PostData = {
	content: string;
	title: string;
	id: string;
	date: string;
}

const Post: React.FC<{ postData: PostData }> = ({ postData }) =>
{
	return (
		<React.Fragment>
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
							}

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
