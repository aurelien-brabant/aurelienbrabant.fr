import type { NextPage } from 'next'
import React, {ReactNode} from 'react';
import { Container } from '../components/container/container'
import { Typewriter } from 'react-simple-typewriter'
import { Button } from '../components/button/button';

import styles from '../styles/Home.module.css'
import {Card} from '../components/card/card';
import { Compass } from '../components/compass/compass';

import { landingPosts } from '../data/landing_posts';

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

  return (
    <React.Fragment>
      <Compass />

      <Container
        backgroundImage={{
          url: '/landing_bg.jpeg',
          hexColor: '#000',
          opacity: '0.88'
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
            <span className={styles.letterEmphasis}>I</span> ❤️ web development, low-level coding that makes me learn new stuff, and I am also a free software advocate. Just tell me about
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
          hexColor: '#000',
          opacity: '0.75'
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

      { /* I am a writer */ }

      <Container
        limitedWidth={false}
        backgroundImage= {{
          url: '/spyglass.jpeg',
          hexColor: '#000',
          opacity: '0.85'
        }}
      >
        <Container
          className={styles.textCtaSection}
        >
          <h2 className={styles.title}> I am a writer </h2>

          <p> I love to share my knowledge with other people, therefore I'm writing a lot of articles. </p>

          <Button
            className={styles.ctaButton}
          >
            Discover my blog
          </Button>
        </Container>
      </Container>


    </ React.Fragment>
  )

} 

export default Home
