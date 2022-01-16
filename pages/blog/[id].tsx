import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import MarkdownRenderer from '../../components/MarkdownRenderer'
import { FaComments, FaMapMarkerAlt } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi'

import aurelienPhoto from '../../public/aurelien.webp'

import ReactMarkdown from 'react-markdown'
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
import { HeadingComponent } from 'react-markdown/lib/ast-to-react'
import { useRouter } from 'next/router'

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

const TOCHeadings: React.FC<{
	headings: NestedHeading[]
	level: number
	onClick: any
}> = ({ headings, level, onClick }) => {
	return (
		<React.Fragment>
			{headings.map((el) => (
				<React.Fragment key={el.id}>
					<div
						onClick={(e) => {
							onClick(e, el)
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
								onClick={onClick}
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

const TableOfContents: React.FC<{
	headings: NestedHeading[]
	onClick: any
	isVisible: boolean
}> = ({ headings, onClick, isVisible }) => {
	return (
		<nav className={`${styles.sidenav} ${isVisible ? styles.visible : ''}`}>
			<TOCHeadings headings={headings} level={1} onClick={onClick} />
		</nav>
	)
}

export const getServerSideProps: GetServerSideProps = async function (context) {
	const props: { [key: string]: any } = {}

	if (context.params) {
		const res = await fetch(
			`http://${process.env.API_HOST}:${process.env.API_PORT}/blogposts/search?by=string_id&payload=${(context.params.id as string).toLowerCase()}`
		)

		if (res.status != 200) {
			return {
				notFound: true,
			}
		}

		const postData: BrabantApi.BlogpostData = await res.json()

		postData.releaseTs = postData.releaseTs
		postData.lastEditTs = postData.lastEditTs

		props.postData = postData
	}

	return {
		props,
	}
}

enum ReaderState {
	READER_TEXT,
	READER_GLOSSARY,
	READER_COMMENTS,
}

const Post: React.FC<{ postData: BrabantApi.BlogpostData }> = ({
	postData,
}) => {
	const [readerState, setReaderState] = useState(ReaderState.READER_TEXT)
	const [anchor, setAnchor] = useState('')
	const [scrollCoords, setScrollCoords] = useState({ x: 0, y: 0 })
	const [isSidenavVisible, setIsSidenavVisible] = useState(false)

	const router = useRouter()

	const handleGlossaryClick = (e: React.MouseEvent, el: NestedHeading) => {
		e.preventDefault()
		const target = document.getElementById(el.id as string)

		target?.scrollIntoView({ behavior: 'smooth' })

		history.pushState(
			{},
			document.title,
			`${window.location.href.split('#')[0]}#${anchor}`
		)
	}

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

			<section className={styles.postContent} style={{}}>
				{/* MARKDOWN RENDERING */}

				<Container className={styles.contentBox} edgePadded={false}>
					<div className={styles.toolbox}>
						<div>
							<button>
								<GiHamburgerMenu
									onClick={() => {
										setIsSidenavVisible(!isSidenavVisible)
									}}
								/>
							</button>
						</div>
						<h4>{postData.title}</h4>
						<div>
							<button>
								<AiOutlineClose
									onClick={() => {
										router.push('/blog')
									}}
								/>
							</button>
						</div>
					</div>
					<div className={styles.markdownWrapper}>
						<TableOfContents
							onClick={handleGlossaryClick}
							headings={headings}
							isVisible={isSidenavVisible}
						/>
						{readerState === ReaderState.READER_TEXT && (
							<div className={styles.markdownContent}>
								<ReactMarkdown
									components={{
										// eslint-disable-next-line react/display-name
										code: ({
											children,
											inline,
											className,
										}) => {
											const match = /language-(\w+)/.exec(
												className || ''
											)
											return match && !inline ? (
												<MarkdownCodeBlock
													language={match[1]}
												>
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
												src={src ? src.startsWith('http') ? src : `/blog/${postData.stringId.toLowerCase()}/${src}` : ''}
												alt={
													alt
														? alt
														: 'no alt provided'
												}
											/>
										),

										// eslint-disable-next-line react/display-name
										h1: ({ children, level }) => {
											return (
												<MarkdownHeading
													headingLevel={level}
												>
													{children}
												</MarkdownHeading>
											)
										},

										// eslint-disable-next-line react/display-name
										h2: ({ children, level }) => (
											<MarkdownHeading
												headingLevel={level}
											>
												{children}
											</MarkdownHeading>
										),

										// eslint-disable-next-line react/display-name
										h3: ({ children, level }) => (
											<MarkdownHeading
												headingLevel={level}
											>
												{children}
											</MarkdownHeading>
										),

										// eslint-disable-next-line react/display-name
										p: ({ children, ...props }) => {
											return children[0] &&
												typeof children[0] ===
													'object' &&
												(children[0] as any).type
													.name === 'img' ? (
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
						)}
					</div>
				</Container>
			</section>
		</React.Fragment>
	)
}

export default Post
