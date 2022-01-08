import React, {CSSProperties} from "react";

type ExternalLinkProps = {
	href: string;
	className?: string;
	style?: CSSProperties;
};

const ExternalLink: React.FC<ExternalLinkProps> = ({ children, href, ...rest }) => {
	return (
		<a href={href} target="_blank" rel="noreferrer" {...rest}>
			{children}
		</a>
	);
};

export default ExternalLink;
