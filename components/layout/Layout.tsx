import React from "react";
import {Footer} from "../footer/footer";

type LayoutInputProps = {
};

export const Layout: React.FC<LayoutInputProps> = ({ children }) => {
	return (
		<React.Fragment>
			{children}
			<Footer />
		</React.Fragment>
	)
};
