import React from "react";

type ExternalLinkProps = {
	href: string;
};

const ExternalLink: React.FC<ExternalLinkProps> = ({ children, href }) => {
	return (
		<a href={href} target="_blank" rel="noreferer">
			{children}
		</a>
	);
};

export default ExternalLink;
