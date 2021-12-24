---
title: "Create a robust multi language system using React"
content: "In order to target a large audience, it is sometimes needed to make a website available in several languages. This post presents a robust and handy way to implement such a system using ReactJS."
releaseTs: "2021-10-10"
authorEmail: "perso@aurelienbrabant.fr"
coverImagePath: "/some/local/path"
tags:
- React
- Web
- Javascript
- Typescript
---

Making content available to people that speak different languages is always a great thing, as it means that whatever you're sharing will
get more attention. However, implementing such a feature can be a little bit tedious, especially if a naive approach is taken. Trust me, we don't want
to use `if-else` branching for each text we want to display.

In this post, I will present my answer to that problem, implemented with React. This is a robust approach, suited for medium-sized websites that want to provide
translations for a few languages.

Because we are using React, it will be easy to implement **instantaneous** language switching (no page reload on language change), which will definitely improve the user experience.

# Setup

## Project requirements

First things first: we need to break down our initial problem into several smaller ones.

In order for us to implement our feature, we will need to:

- Make the currently selected language available to the whole React application.
- Provide data in an appropriate format to select the text to display according to the selected language.
- Build a **flexible** React component that will provide the actual translation feature.
- Re-render all the components that contain translated text each time the language is changed: this should be instantaneous.
- Bonus: keep user's prefered language into browser's local storage so that language is remembered until local storage is cleared.

## Demo!

If you want a demo of what we are going to build, then try to click on one of the flags on the top right corner of the navigation bar: it should dynamically change text everywhere on the website, excepting blog posts that haven't been translated yet.

# Storing translation data

Let's start by figuring out how to store the data that we'll use to provide the actual translations. We're going to manually define which string we want if a given
language is selected.

## Data model representation decision

A simple key-value pair data structure would probably be sufficient, and fortunately for us, this is basically what a Javascript object is. However, storing pure data in a Javascript object defeats Javascript's purpose: it is a programming language, not a way to represent static data. For that, `JSON` (Javascript Object Notation) seems to be a better option.

We'll then store our data into `JSON` files, one for each language we want to support.

For exemple, for english, we can create a `en.json` file:

```json
{
	"heading": "My awesome React App featuring hot language switching",
	"subheading": "https://aurelienbrabant.fr is a truly awesome website"
}
```

And for its french equivalent, a `fr.json` file:

```json
{
	"heading": "Mon app React fabuleuse avec changement de langue dynamique",
	"subheading": "https://aurelienbrabant.fr est un site web de beau gosse"
}
```

Each key is a string and has its associated value, which is the translated version in a specific language. While values obviously
differ in each language file, keys must correspond in order for us to match the correct translation later.

> Be careful about the JSON syntax, which is much more restrictive that the one of Javascript objets.

## Importing JSON data as a Javascript object

Before going further, please make sure you've the `json-loader` npm package installed in your project, otherwise
we won't be able to import `.json` files directly later (if you've bootstrapped your app using `create-react-app`, it is included by default).

# Provide selected language using React Context

In order for us to know which language is selected from almost anywhere in the app, we need to make this information available globally.
In conjunction with hooks, [React Context](https://reactjs.org/docs/context.html) will help us getting this done without passing the language prop manually.

## Define a Language object

Before we use context, we need to define what a `Language` object is. As we are using Typescript, it should be as easy as writing:

```tsx
export type Language = 'fr' | 'en' | 'de' | 'es';
```

Here, we define `Language` as an union type: a `Language` object is essentialy a `string` that can only takes four given values, each one corresponding to a language that we will support.

## Create the context

Now, creating a context object is pretty straightforward. We'll simply make use of the `createContext` object:

```tsx
type LanguageContextData =
{
	language: Language;
	setLanguage?: Function;
}

export default createContext<LanguageContextData>({
	language: 'en',
});
```

`setLanguage` will be the function responsible for changing the language dynamically. It is defined as an optional property because we can't provide a meaningful default value
for it at the time we are creating the context. More on that in a second.

## Create a custom context Provider

The context Provider will wrap our whole React application, making context's data available to every children. While we could simply use the `Provider`
property of the context object directly, we definitely want to wrap this inside another functional component, as we will need to do some additional setup in it:

```tsx
import type { Language } from '../lib/language';
import languageContext from './languageContext';

const LanguageProvider: React.FC<{}> = ({ children }) =>
{
	const [ language, setLanguage ] = useState<Language>('en');

	return (
		<languageContext.Provider
			value={{
				language,
				setLanguage
			}}
		>
			{ children }
		</languageContext.Provider>
	);
}

export default LanguageProvider;
```

The important thing: we have used the `useState` hook in order to attach some piece of state to our functional component. The "true" default language is
set as the state's default value, and passed down to the Provider's value prop, which is of type `LanguageContextData`. We can also pass the state setter inside the object,
giving the ability to any user of the context to change the language state for the whole app.

That being done, let's wrap our application with the Provider, like so:

```tsx
import LanguageProvier from './LanguageProvider';

ReactDOM.render(
	<React.StrictMode>
		<LanguageProvider>
			<App />
		</LanguageProvider>
	</React.StrictMode>,
  document.getElementById('root')
);
```

> Of course we'd do things differently if using `NextJS` or any routing solution. This is only given as an example.

Now any component of the app can have access to `language` and `setLanguage`. Well done, let's move on!

# Building a Translator component

Now that we have our data and our currently selected language, it is time to dive into our core feature: the `Translator` component, which will be
responsible for rendering the text **depending on the selected language**.

## Component design

Before actually coding the component, maybe we want to first think about *how we want it to behave*. Let's say we are rendering some `div` element, with some paragraphs
inside it. We want each paragraph to be translated. Maybe we want something like that?

```tsx
	/* ... */
	return (
	<div>
		<p> <Translator>paragraph1</Translator> </p>
		<p> <Translator>paragraph2</Translator> </p>
		{ /* more paragraphs */ }
	</div>
	);
	/* ... */
```

Or maybe something like this?

```tsx
	/* ... */
	return (
	<div>
		<p> <Translator key="paragraph1" />  </p>
		<p> <Translator key="paragraph2" /> </p>
		{ /* more paragraphs */ }
	</div>
	);
	/* ... */
```

Well, whether we use one style or the other, both will work. For that post, I will stick with the last version, which determines which key to use through a `key`
prop, while the first receives the same information as a children.

I've seen both being used and I'm currently using the first solution on my website, but in my opinion passing a prop is better as it is more clear that we want to pass
is a string. Just putting text between tags may feel more HTML-ish for some people though.

## Coding the component

To code the translator component, we will need to:
- Get the currently selected language.
- Use the correct data object and find the string corresponding to the given key.
- Render the string.

Let's first create our component boilerplate:

```tsx
import { Fragment } from 'react';

type TranslatorProps = {
	key: string;
};

const Translator: React.FC<TranslatorProps> = () =>
{
	return <Fragment>{key}</Fragment>;
}

export default Translator;
```

### Get the currently selected language

Using the `useContext` hook, we can now easily get the selected language. To keep things separate, we are going to bundle all the translation
logic into a custom hook.

> As a reminder, a custom React hook is nothing else than a function that makes use of standard React hooks internally. By convention, these functions always
> start with the `use` prefix.

```tsx
import LanguageContext from './LanguageContext';
import { useContext } from 'react';

/**
 * Given a key, returns the translated
 * value according to the currently set language
 */

const useTranslator = (key: string): string =>
{
	const { language } = useContext(languageContext);

	// TODO: match language with the corresponding object

	// TODO: match key with the correct object's property

	// TODO: return translated value, return the key if it couldn't be found.
	return key;
}

```

Using **ES6 destructuring** syntax, we can easily extract the currently set language and make use of it.

### Match language and data object

Now, let's match the current language with the corresponding data stored as a `json` object.
One of the easiest way to do that is to create a *lookup table*:

```tsx
import languageEN from './en.json';
import languageFR from './fr.json';

const availableLanguages: { [key: string]: any } = {
	'fr': languageFR,
	'en': languageEN
};
```

Under the form of a standard Javascript object, we have created a lookup table, which will allow us to access a given language object
by simply subscripting the table, like so: `availableLanguages[currentlySetLanguage]`.

As explained before, the `JSON` files are imported as Javascript objects on the top of the file using `json-loader`. As simple as that.

Now that we have that table, we can complete our custom hook to retrieve the correct translation:

```tsx
const useTranslator = (key: string): string =>
{
	const { language } = useContext(languageContext);

	if (availableLanguages[language] !== undefined) {
		return availableLanguages[language][key] || key;
	} else {
		console.error(`${language} is not an available language`);
	}

	return key;
}
```

If the current language is part of the `availableLanguages` table, the corresponding data file
is subscripted with the `key` prop in order to return the translation as a string. If there is no
language file for the currently set language (which should normally never happen), it is reported and
the `key` prop is returned.

If the language file exists but there is no such key, the key is also returned.

### Render the translated text

Now, let's update the `Translator` component to make use of the hook:

```tsx
const Translator: React.FC<TranslatorProps> = ({ key }) =>
{
	return <Fragment>{useTranslator(key)}</Fragment>
}
```
And voilà! Translator, done! Now you can use this component to provide automatic translations as long as the language data file has the corresponding key-value pair. As soon
as the `setLanguage` function will be called, the `LanguageContext` and all its children are going to be re-rendered, which includes every `Translator` component. That's the way
text gets live-updated!

The only missing piece is the interface that will allow language switching by calling `setLanguage`. I will leave that to you!

## Towards a more flexible Translator component

> If you're satisfied with the `Translator` component we've built, then feel free to skip this section.
> If you feel like it lacks some customizability, then continue reading!

One problem of the `Translator` component as it is now is that **we can't render anything else than raw strings**. While it may be sufficient for many use cases, extending its functionalities would be great!

### The problem

Imagine that we need to style the content that we *also* need to translate. On the web, styling is done through the use
HTML tags which are assigned class names or style rules directly.

However, we can't really do that in our language file.
It is indeed possible, in React, to transform a string with HTML inside it into proper HTML, but this is often a dangerous thing to do, and it would defeat the purpose of the language file.

### Possible solutions

To solve this problem, we may consider two solutions: 

- Make use of some *markup language* (markdown for one) inside the translated strings, that is then parsed and safely rendered into proper
HTML.
- Add a feature to the `Translator` that allows to render different `JSX` elements depending on the selected language.

While the first solution is probably be better because it'd not require more code inside the components making use
of the `Translator`, it'd also require a lot of technical setup which is out of the scope of this post.

For my website, I implemented the second solution, allowing me to write something like:

```tsx
	/* ... */
	<Translator
		manual={{
			'fr': <a href="#lien">un lien</a>,
			'en': <a href="#link">a link</a>
		}}
	/>
	/* ... */
```

As I said, this solution adds a lot of code and is really similar to `if-else` branching, but in my opinion it is good enough for more exceptional use cases.

We'll not discuss the implementation here, but I just wanted to talk about what could be done to improve our `Translator` component.

# Implement persistence in browser's local storage

One additional thing we would want to do is to remember which is the last language the browser has used last time the website has been visited.
One easy way to implement such a thing is to make use of the web browser's [storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
in order to store that information as a *cookie*.

## Using the storage API

The storage API is pretty straightforward to use: we're going to store the last selected language as a key-value pair by using `window.setItem`, while retrieving the value
will be done through the use of `window.getItem`.

## Set the default language by using the storage API

To set the default language when the Javascript is loaded, we need to edit our `LanguageProvider`:

```tsx
import { availableLanguages } from './lib/language';

const LanguageProvider: React.FC<{}> = ({ children }) =>
{
	const [ language, setLanguage ] = useState<Language>('en');

	useEffect(() => {
		const storedLanguage = window.localStorage.getItem('language');

		if (storedLanguage &&
			availableLanguages.includes(storedLanguage as Language)) {
			setLanguage(storedLanguage as Language);
		} else {
			console.error(`Could not load language "${storedLanguage}"
				as it does not refer to a supported language value.`);
		}
	}, []);

	return (
		<languageContext.Provider
			value={{
				language,
				setLanguage
			}}
		>
			{ children }
		</languageContext.Provider>
	);
}
```

When the `LanguageProvider` is first mounted, the `useEffect` hook is called and checks if there is a `language` item in the local storage.
If there is one, then it loads the language through a call to `setLanguage`, otherwise nothing happens.

That's all we need to greatly improve our user experience!

# Last words

That's it for today! You should now be able to implement a robust multi language system in any React application!

[Let me know](https://aurelienbrabant.fr/contact) if this post helped or if you've a suggestion of any kind!
