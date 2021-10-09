import React, { ReactNode } from "react";
import Link from "next/link";
import SyntaxHighlighter from "react-syntax-highlighter";
import syntaxTheme from "react-syntax-highlighter/dist/cjs/styles/hljs/tomorrow-night"

import { textToCSSId } from "../../lib/text_to_css_id";

import styles from "./markdown.module.css";

type CodeBlockProps = {
	language: string;
	children: ReactNode[];
};

export const CodeBlock: React.FC<CodeBlockProps> = ({ language, children }) => {
	return (
		<SyntaxHighlighter
			language={language}
			style={syntaxTheme}
			codeTagProps={{
				style: {
					fontFamily: "Terminus",
					fontSize: "1em",
				},
			}}
		>
			{String(children).replace(/\n$/, "")}
		</SyntaxHighlighter>
	);
};

type Image = {
	src: string;
	alt: string;
};

export const Image: React.FC<Image> = ({ src, alt }) => {
	return (
		<Link href={src}>
			<a target="_blank">
				<img className={styles.image} src={src} alt={alt} />
			</a>
		</Link>
	);
};

type InlineCode = {};

export const InlineCode: React.FC<InlineCode> = ({ children }) => (
	<span className={styles.inlineCode}>{children}</span>
);

type AnchorHeading = {
	headingLevel: number;
};

export const AnchorHeading: React.FC<AnchorHeading> = ({
	children,
	headingLevel,
}) => {
	const Tag = ("h" + headingLevel) as keyof JSX.IntrinsicElements;
	const suitableId = textToCSSId(String(children));

	return (
		<div
			className={`${styles.anchorHeading} ${
				headingLevel === 1 ? styles.separator : ""
			}`}
		>
			<span
				className={`${styles.anchor}`}
				onClick={() => {
					history.pushState(
						{},
						document.title,
						`${window.location.href.split("#")[0]}#${suitableId}`
					);
				}}
			>
				#
			</span>
			<Tag id={suitableId} className="markdown-heading">
				{children}
			</Tag>
		</div>
	);
};

// classical link
type Anchor = {
	href: string | undefined;
	target: string | undefined;
};

export const Anchor: React.FC<Anchor> = ({ href, target, children }) => {
	return (
		<a href={href} className={styles.anchor} target={target}>
			{children}
		</a>
	);
};

export const Blockquote: React.FC<{}> = ({ children }) => {
	return <blockquote className={styles.blockquote}>{children}</blockquote>;
};
