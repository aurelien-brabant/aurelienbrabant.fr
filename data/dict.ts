export enum Language { FR, EN };

export const indexDict: { [key: string]: { [lkey: string]: string } } = {
	hi: {
		[Language.FR]: "Aurelien Brabant",
		[Language.EN]: "Hi, I'm Aurelien",
	},
	
	hi_sub: {
		[Language.FR]: "Je fais des sites web et écris des articles sur la programmation et l'echosystème GNU/Linux",
		[Language.EN]: "I make websites and write about programming and GNU/Linux stuff"
	},

	hi_introduction: {
		[Language.FR]: "Je suis actuellement étudiant à l'école 42 à Paris où j'étudie la programmation, faisant principalement du C et du C++. Je réalise aussi des sites web rapides modernes et fiables à l'aide de NodeJS et de Typescript",
		[Language.EN]: "I'm currently learning programming at 42 Paris, where I mainly concentrate on C and C++ programming. I'm also building blazing fast, modern and reliable websites using NodeJS and Typescript"
	},

	technologies_heading: {
		[Language.EN]: "You and I love technology, right ?",
		[Language.FR]: "Vous et moi aimons la technologie n'est-ce pas?"
	},

	technologies_sub: {
		[Language.EN]: "Here are some of the technologies I use",
		[Language.FR]: "Voici les technologies avec lesquelles je travaille"
	},

	technologies_get_in_touch: {
		[Language.EN]: "Interested in my skills?",
		[Language.FR]: "Intéressé par mes compétences",
	},

	technologies_get_in_touch_btn: {
		[Language.EN]: "Let's get in touch!",
		[Language.FR]: "Entrons en contact!"
	},

	blog_section_heading: {
		[Language.EN]: "We need programming stories",
		[Language.FR]: "Les développeurs savent aussi raconter des histoires"
	},

	blog_section_sub: {
		[Language.EN]: "Stories are great, but programming ones are even greater.",
		[Language.FR]: "Les histoires c'est bien, mais des histoires de programmation c'est encore mieux."
	},

	blog_section_btn: {
		[Language.EN]: "Check out my blog",
		[Language.FR]: "Découvrez mon blog",
	}
}
