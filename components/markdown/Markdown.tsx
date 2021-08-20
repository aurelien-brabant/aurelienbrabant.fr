import {useRouter} from 'next/dist/client/router';
import React, {ReactNode, useState} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

import styles from './markdown.module.css';

type CodeBlockProps = {
	language: string;
	children: ReactNode[];
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ language, children }) =>
	{
	return (
		<SyntaxHighlighter
			children={String(children).replace(/\n$/, '')}
			language={language}
			style={vs2015}
			showLineNumbers
			codeTagProps={{
				style: {
					fontFamily: "Terminus",
					fontSize: '1.1em'
			}
			}}
		/>)
}

type Image = {
	src: string | undefined;
	alt: string | undefined;
}

export const Image: React.FC<Image> = ({ src, alt }) =>
{
	const router = useRouter();

	return (
		<div
			className={styles.image}
			onClick={ () => {
				window.open(src, '_blank');
			}}
		>
			<img src={src} alt={alt} />
			{ alt && ( <p>{alt}</p> )}
		</div>
	)
}

type InlineCode = {
}

export const InlineCode: React.FC<InlineCode> = ({ children }) => (
	<span
		className={styles.inlineCode}
	>
		{children}
	</span>
)

type AnchorHeading = {
	headingLevel: number;
}

export const AnchorHeading: React.FC<AnchorHeading> = ({ children, headingLevel }) =>
{
	const suitableId = String(children).toLowerCase().split(' ').join('-');
	console.log(suitableId);

	const Tag = 'h' + headingLevel as keyof JSX.IntrinsicElements; 

	return (
		<div
			className={`${styles.anchorHeading} ${headingLevel === 1 ? styles.separator : ''}`}
		>
			<span
				className={`${styles.anchor}`}
				onClick={() => { navigator.clipboard.writeText(`${window.location.href.split('#')[0]}#${suitableId}`) } }
			>
			#
			</span>
			<Tag
				id={suitableId}
			>
				{children}
			</Tag>
		</div>
	);
}
