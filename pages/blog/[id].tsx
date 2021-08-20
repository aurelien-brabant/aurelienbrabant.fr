import React from 'react';

import { useEffect } from "react"; 

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

import remarkSlug from 'remark-slug';

type PostData = {
	content: string;
	title: string;
	id: string;
	date: string;
}

export default function Post({ postData }: { postData: PostData})
{
	useEffect(() => {
		//setPostId(window.location.pathname.split('/')[2]);
	}, [])

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
						children={postData.content}
						components={{

							code: ({children, inline, className, ...props}) => {
								const match = /language-(\w+)/.exec(className || '')
								return match && !inline ? (
									<MarkdownCodeBlock children={children} language={match[1]} />
								) : (
									<MarkdownInlineCode>{children}</MarkdownInlineCode>
								);
							},

							/* only image's name must be provided, path is automatically resolved using postData */
							img: ({ src, alt }) => (
								<MarkdownImage src={`/blog/${postData.id}/${src}`} alt={alt} />
							),

							h1: ({ children, level }) => (
								<MarkdownHeading headingLevel={level}>{children}</MarkdownHeading>
							),

							h2: ({ children, level }) => (
								<MarkdownHeading headingLevel={level}>{children}</MarkdownHeading>
							),

							h3: ({ children, level }) => (
								<MarkdownHeading headingLevel={level}>{children}</MarkdownHeading>
							)

						}}
					/>

				</Container>
			</Container>
		</React.Fragment>
	);
}

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
