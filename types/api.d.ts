declare namespace BrabantApi {
	/**
	 * API route: GET /blogposts
	 */

	export type BlogpostPreview = {
		blogpostId: number;
		title: string;
		description: string;
		authorId: number;
		authorUsername: string;
		releaseTs: Date;
		lastEditTs: Date;
		estimatedReadingTime: number;
		stringId: string;
	};

	/**
	 * API route: GET /blogposts/:id
	 */

	export type BlogpostData = {
		blogpostId: number;
		title: string;
		description: string;
		authorId: number;
		content: string;
		releaseTs: Date;
		lastEditTs: Date;
		coverImagePath: string;
		estimatedReadingTime: number;
		stringId: string;
	};

	/**
	 * API route: GET /users
	 */

	export type UserPreview = {
		userId: number;
		email: string;
		username: string;
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
}
