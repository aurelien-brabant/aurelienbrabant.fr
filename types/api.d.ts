declare namespace BrabantApi {
	/**
	 * API route: GET /blogposts
	 */
	
	export type GetBlogposts = {
		tags: string[];
		posts: BlogpostPreview[];
	}

	export type BlogpostPreview = {
		blogpostId: number;
		title: string;
		description: string;
		authorId: number;
		authorUsername: string;
		authorPictureURI: string;
		releaseTs: Date;
		lastEditTs: Date;
		estimatedReadingTime: number;
		stringId: string;
		tags: string[];
		coverImagePath: string;
	};

	/**
	 * API route: GET /blogposts/:id
	 */

	export type BlogpostData = {
		blogpostId: number;
		title: string;
		description: string;
		authorId: number;
		authorUsername: string;
		authorPictureURI: string;
		content: string;
		releaseTs: Date;
		lastEditTs: Date;
		coverImagePath: string;
		estimatedReadingTime: number;
		stringId: string;
		tags: string[];
	};

	/**
	 * API route: GET /users
	 */

	export type UserPreview = {
		userId: number;
		email: string;
		username: string;
		pictureURI: string;
		role: number;
	};

	/**
	 * API route: GET /users/:id
	 */

	export type UserData = {
		userId: number;
		email: string;
		username: string;
		firstname?: string;
		lastname?: string;
		pictureURI: string;
		role: number;
		isEmailVerified: boolean;
		isActivated: boolean;
		accountCreationTs: Date;
		lastLoginTs: Date;
	};

	export type CreateUserRet = {
		email : string,
		username: string,
		accountCreationTs: Date,
	}

	export type Technology = {
		name: string;
		logoURI: string;
	}

	export type ProjectPreview = {
		name: string;
		description: string;
		coverURI: string;
		technologies: Technology[];
	}

	export type Project = {
		name: string;
		description: string;
		coverURI: string;
		content: string;
		technologies: Technology[];
	};
}
