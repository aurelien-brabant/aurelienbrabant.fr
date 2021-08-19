import React from 'react';

import { useEffect } from "react"; 

import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from 'react-syntax-highlighter';

import { getPostsId, getPostData } from "../../lib/posts";

import {Container} from '../../components/container/container'

import styles from '../../styles/blog/id.module.css';

import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
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

					<ReactMarkdown
						remarkPlugins={[[remarkSlug, {}]]}
						children={postData.content}
						components={{
							code: ({children, inline, className, ...props}) => {
								const match = /language-(\w+)/.exec(className || '')
								if (!inline) return (
									<SyntaxHighlighter
										children={String(children).replace(/\n$/, '')}
										language={match ? match[1] : ''}
										style={atomOneDark}
										showLineNumbers
										codeTagProps={{
											style: {
												fontFamily: "Terminus",
												fontSize: '1.2em'
										}
										}}
									/>
								)
								return <span className={styles.inlineCode}>{children}</span>
							}
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
