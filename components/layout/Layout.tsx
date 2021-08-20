import React from "react";
import {Footer} from "../footer/footer";
import Header from '../header/header';

type LayoutInputProps = {
};

export const Layout: React.FC<LayoutInputProps> = ({ children }) => {
	return (
		<React.Fragment>
			<Header />
			{children}
			<Footer />
		</React.Fragment>
	)
};
