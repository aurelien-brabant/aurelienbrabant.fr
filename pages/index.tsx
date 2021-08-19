import type { NextPage } from 'next'
import React, {ReactNode} from 'react';
import Tada from 'react-reveal/Tada';
import { Container } from '../components/container/container'
import { Typewriter } from 'react-simple-typewriter'
import { Button } from '../components/button/button';

import styles from '../styles/Home.module.css'
import {Card} from '../components/card/card';

import { landingPosts } from '../data/landing_posts';
import Link from 'next/link';

type Technology =
{
  name: string;
  imageUrl: string;
}

const Home: NextPage = () => {

  const renderLandingPosts = (): ReactNode =>
  {
    return landingPosts.map((post) => (
        <Card
          key={post.title}
          title={post.title}
          subtitle={`Duration: about ${post.duration}`}
          description={post.description}
          onClickUrl={post.githubLink}
          imageCoverUrl={post.imageCoverUrl}
        />
    ))
  }

  const technologies: Technology[] = [
    {
      name: 'HTML5',
      imageUrl: '/technologies/html.png'
    },
    {
      name: 'CSS3',
      imageUrl: '/technologies/css.png'
    },
    {
      name: 'JavaScript',
      imageUrl: '/technologies/javascript.png'
    },
    {
      name: 'TypeScript',
      imageUrl: '/technologies/typescript.png'
    },
    {
      name: 'NodeJS',
      imageUrl: '/technologies/nodejs.png'
    },
    {
      name: 'NextJS',
      imageUrl: '/technologies/nextjs.png'
    },
    {
      name: 'ReactJS',
      imageUrl: '/technologies/react.png'
    },
    {
      name: 'NestJS',
      imageUrl: '/technologies/nestjs.svg'
    },
    {
      name: 'Docker',
      imageUrl: '/technologies/docker.png'
    },
    {
      name: 'C',
      imageUrl: '/technologies/c.png'
    },
    {
      name: 'C++',
      imageUrl: '/technologies/cpp.png'
    },
    {
      name: 'Git',
      imageUrl: '/technologies/git.png'
    },
    {
      name: 'Vim',
      imageUrl: '/technologies/vim.png'
    },
    {
      name: 'MacOS',
      imageUrl: '/technologies/apple.png'
    },
    {
      name: 'Linux',
      imageUrl: '/technologies/tux.png'
    },
    {
      name: 'Notion',
      imageUrl: '/technologies/notion.png'
    }
  ];

  return (
    <React.Fragment>
      <Container
        backgroundImage={{
          url: '/landing_bg.jpeg',
          rgbaColor: 'rgba(0, 0, 0, 0.85)',
        }}
        limitedWidth={false}
      >

        <Container
          className={styles.mainContainer}
          fillPageHeight={true}
        >
          <h1 className={styles.greetings}> I'm <span className={styles.typewritten}>
            <Typewriter
              words={['a developer', 'an explorer', 'a traveler', 'fascinated', 'dedicated']}
              loop={0}
              cursor
              cursorStyle='|'
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
              onLoopDone={() => console.log(`Done after 5 loops!`)}
            /> {' '} </span>✍️
          </h1>

          <p className={styles.introduction}>
            <span className={styles.letterEmphasis}>H</span>i there 👋! My name is Aurélien Brabant, I am a {' '}
            🇫🇷 programmer currently studying at <a href='https://42.fr'>school 42</a> in Paris.
          </p>

          <p className={styles.introduction}>
            <span className={styles.letterEmphasis}>I</span> love web development, low-level coding that makes me learn new stuff, and I am also a free software advocate. Just tell me about
            anything IT related, and I will listen to you carefully!
          </p>

          <p className={styles.introduction}>
            <span className={styles.letterEmphasis}>M</span>oreover, I also like to read, especially philosophy and classical litterature. This has nothing to do with IT, but it gives me a lot of new ideas, such as this landing page!
          </p>


          <img src='/me.jpeg' className={styles.aurelienImage} />

          <div className={styles.scrollCta}>
            <h2>Scroll to discover my work</h2>

            <div className={styles.arrow}>
              <span></span>
              <span></span>
            </div>
          </div>

        </Container>
      </Container>

      <Container
        className={styles.centeredTextContainer}
        limitedWidth={false}
        backgroundImage= {{
          url: '/waterflow.jpg',
          rgbaColor: 'rgba(0, 0, 0, 0.85)',
        }}
      >
        <Container
          limitedWidth={false}
        >
          <h2 className={styles.title}> Project showcase! </h2>
          <h3 className={styles.subtitle}> Take a look at some of my projects! </h3>

          <div className={styles.projectCards}>
            { renderLandingPosts() }
          </div>
        </Container>
      </Container>

      <Container className={styles.technologiesContainer}>
        <h2> You and I love technology, right ? </h2>
        <h3> Here is what I work with </h3>
        <div className={styles.technologies}>
          { technologies.map(technology => (
            <Tada>
              <img src={technology.imageUrl} />
            </Tada>
          ))}
        </div>
        <div
          className={styles.cta}
        >
          <h2> Interested in my skills? </h2>
          <Link href="/contact"><a>Let's get in touch!</a></Link>
        </div>
      </Container>

      { /* I am a writer */ }

      <Container
        limitedWidth={false}
        backgroundImage= {{
          url: '/spyglass.jpeg',
          rgbaColor: 'rgba(0, 0, 0, 0.85)',
        }}
      >
        <Container
          className={styles.textCtaSection}
        >
          <h2 className={styles.title}> We need programming stories </h2>

          <p> Stories are great, but programming ones are even greater.</p>

            <Button
             href="/blog"
            className={styles.ctaButton}
          >
            Check out my blog
          </Button>
        </Container>
      </Container>


    </ React.Fragment>
  )
} 

export default Home
