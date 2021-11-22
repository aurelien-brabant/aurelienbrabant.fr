![](https://i.imgur.com/ZlhbIGD.png)

This is the code source repository that holds my personal website, mainly standing as my portfolio.

It is a static website built with NextJS, ReactJS and Typescript.

In case you're curious, I'm giving details about how I have setup some parts of my website right below.

# Styling

I first used plain CSS files, but I recently refactored almost every stylesheet using the  [SASS](https://sass-lang.com/) CSS preprocessor.
Not a big change to be honest, I would probably be really happy too with something like [Less](https://lesscss.org/) or even going back to plain CSS.

While I've some familiarity with class-based styling framework or [Material UI](https://mui.com/) I really wanted to practice my CSS skills.

# Deployment

While I usually like to deploy stuff on my raspberry pi 4, I deployed my website on a [vultr](https://www.vultr.com/) VPS to benefit from a better bandwidth.

I did setup a nginx reverse proxy that proxies requests to my actual website, these two being run in docker containers.

I also issued a free HTTPS certificate signed by the [Let's Encrypt](https://letsencrypt.org/) authority.

# Why is the website so fast

Maybe because I'm a really smart programmer. Just a hint I'm giving you here.

More seriously, this is mostly coming from [static HTML generation](https://nextjs.org/docs/basic-features/pages#static-generation-recommended) and browser caching.

This is one of the benefits that come along with using NextJS!

# Blog

The blog section of the website is rendered at build time (in fact: like every page on my website) from an array of [markdown](https://en.wikipedia.org/wiki/Markdown) posts.
These posts are rendered to HTML using the [react-markdown](https://github.com/remarkjs/react-markdown) package.

# Dynamic language selector

As you may have noticed, a language switcher is made available at the top right corner of the naviguation bar: once you select your language, (most) data is automatically "translated".

For that, I'm using a homemade solution I discussed [on my blog](https://aurelienbrabant.fr/blog/create-a-robust-multi-language-system-using-react): I'm not using any internationalization library such as [i18n](https://www.npmjs.com/package/i18n), at least not yet.

While it's not [fully](https://aurelienbrabant.fr/projects) [implemented](https://aurelienbrabant.fr/blog) (yet?) it was a great thing to make!