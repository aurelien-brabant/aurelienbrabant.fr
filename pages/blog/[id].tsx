import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import ReactMarkdown from 'react-markdown'
import aurelienPhoto from '../../public/aurelien.webp'

import {
	CodeBlock as MarkdownCodeBlock,
	Image as MarkdownImage,
	AnchorHeading as MarkdownHeading,
	InlineCode as MarkdownInlineCode,
	Anchor,
	Blockquote,
} from '../../components/markdown/Markdown'

import { Container } from '../../components/container/container'

import styles from '../../styles/blogpost.module.scss'
import { GetServerSideProps } from 'next'

type NestedHeading = {
	id: string | undefined
	title: string | undefined
	nested: NestedHeading[]
	headingLevel: number
}

/* ------ HELPERS ------ */

const fromHTMLToNestedHeading = (el: HTMLElement): NestedHeading | null => {
	if (el.nodeName[0].toLowerCase() === 'h' && el.nodeName.length === 2) {
		const level = el.nodeName.charCodeAt(1) - 48

		return {
			id: el.id,
			title: el.innerText,
			nested: [],
			headingLevel: level,
		}
	}

	return null /* not an HTML heading */
}

const insertNestedHeading = (
	head: NestedHeading[],
	inserted: NestedHeading
) => {
	let level = 1
	let target: NestedHeading[] = head

	while (inserted.headingLevel > level) {
		++level
		target = target[target.length - 1].nested
	}
	target.push(inserted)
}

const useMarkdownNestedHeadings = () => {
	const [markdownHeadings, setMarkdownHeadings] = useState<NestedHeading[]>(
		[]
	)

	useEffect(() => {
		const headingElements: HTMLElement[] = Array.from(
			document.querySelectorAll('.markdown-heading')
		)
		const nestedHeadings: NestedHeading[] = []

		for (const headingElement of headingElements) {
			const nested = fromHTMLToNestedHeading(headingElement)

			if (nested) insertNestedHeading(nestedHeadings, nested)
		}
		setMarkdownHeadings(nestedHeadings)
	}, [])

	return markdownHeadings
}

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
							e.preventDefault()
							document
								.querySelector(`#${el.id}`)!
								.scrollIntoView({ behavior: 'smooth' })
							history.pushState(
								{},
								document.title,
								`${window.location.href.split('#')[0]}#${el.id}`
							)
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
						/* render subheadings recursiveltch the list of blog */
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
	)
}

TOCHeadings.defaultProps = { level: 1 }

const TableOfContents: React.FC<{ headings: NestedHeading[] }> = ({
	headings,
}) => {
	return (
		<nav className={styles.sidenav}>
			{/*
			<span
				className={styles.toggleButton}
			>
				X
			</span>
			  */}
			<TOCHeadings headings={headings} level={1} />
		</nav>
	)
}

export const getServerSideProps: GetServerSideProps = async function (context) {
	const props: { [key: string]: any } = {}

	if (context.params) {
		const postData: BrabantApi.BlogpostData = await (
			await fetch(
				`http://backend:3000/blogposts/search?by=string_id&payload=${context.params.id}`
			)
		).json()

		postData.releaseTs = postData.releaseTs;
		postData.lastEditTs = postData.lastEditTs;

		props.postData = postData
	}

	return {
		props,
	}
}

const Post: React.FC<{ postData: BrabantApi.BlogpostData }> = ({
	postData,
}) => {
	const [clientReleaseDate, setClientReleaseDate] = useState<string>()
	const [clientLastEditDate, setClientLastEditDate] = useState<string>()

	useEffect(() => {
		setClientReleaseDate(new Date(postData.releaseTs).toLocaleDateString())
		setClientLastEditDate(new Date(postData.releaseTs).toLocaleDateString());
	})

	const headings = useMarkdownNestedHeadings()

	return (
		<React.Fragment>
			<Head>
				<title>{postData.title}</title>
				<meta name="description" content={postData.description} />
				<meta name="robots" content="index, follow" />
				<link
					rel="canonical"
					href={`https://aurelienbrabant.fr/blog/${postData.stringId}`}
				/>
			</Head>

			<Container
				limitedWidth={false}
				className={styles.mainContainer}
				edgePadded={false}
			>
				<Container className={styles.postHeader}>
					<div className={styles.tagList}>
						{postData.tags &&
							postData.tags.map((tag) => (
								<span key={tag}> {tag} </span>
							))}
					</div>
					<h1> {postData.title} </h1>
					<p> {postData.description} </p>
					<hr className={styles.separator} />
					<div className={styles.metablock}>
						<Image
							src={postData.authorPictureURI}
							alt={'photo of the author'}
							width={40}
							height={40}
							className={styles.authorImage}
						/>
						<div>
							<div style={{ marginBottom: '5px' }}>
								{' '}
								{postData.authorUsername}
							</div>
							<div>
								{' '}
								Last edited the {clientLastEditDate} (Created the {clientReleaseDate}) •{' '}
								{postData.estimatedReadingTime} MINUTES READ
							</div>
						</div>
					</div>
					<img
						src={`/blog/covers/${postData.stringId}.webp`}
						alt={`blogpost's cover`}
						className={styles.postImage}
					/>
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
										className || ''
									)
									return match && !inline ? (
										<MarkdownCodeBlock language={match[1]}>
											{children}
										</MarkdownCodeBlock>
									) : (
										<MarkdownInlineCode>
											{children}
										</MarkdownInlineCode>
									)
								},

								// eslint-disable-next-line react/display-name
								img: ({ src, alt }) => (
									<MarkdownImage
										src={`/blog/${postData.stringId}/${src}`}
										alt={alt ? alt : 'no alt provided'}
									/>
								),

								// eslint-disable-next-line react/display-name
								h1: ({ children, level }) => {
									return (
										<MarkdownHeading headingLevel={level}>
											{children}
										</MarkdownHeading>
									)
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
										typeof children[0] === 'object' &&
										(children[0] as any).type.name ===
											'img' ? (
										<div {...props}>{children}</div>
									) : (
										<p {...props}>{children}</p>
									)
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
	)
}

export default Post
