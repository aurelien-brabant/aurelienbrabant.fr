import ReactMarkdown from 'react-markdown'
import {
	CodeBlock as MarkdownCodeBlock,
	Image as MarkdownImage,
	AnchorHeading as MarkdownHeading,
	InlineCode as MarkdownInlineCode,
	Anchor,
	Blockquote,
} from './markdown/Markdown'

const MarkdownRenderer: React.FC<{}> = ({ children }) => {
	return (
		<ReactMarkdown
			components={{
				// eslint-disable-next-line react/display-name
				code: ({ children, inline, className }) => {
					const match = /language-(\w+)/.exec(className || '')
					return match && !inline ? (
						<MarkdownCodeBlock language={match[1]}>
							{children}
						</MarkdownCodeBlock>
					) : (
						<MarkdownInlineCode>{children}</MarkdownInlineCode>
					)
				},

				// eslint-disable-next-line react/display-name
				img: ({ src, alt }) => (
					<MarkdownImage
						src={'' + src}
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
						(children[0] as any).type.name === 'img' ? (
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
			{String(children)}
		</ReactMarkdown>
	)
}

export default MarkdownRenderer;
