import React, { ReactNode } from "react";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark as syntaxTheme } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { BsLink45Deg } from 'react-icons/bs';

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
					fontFamily: "MonoLisa",
					fontSize: ".8em",
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
				<BsLink45Deg />
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
