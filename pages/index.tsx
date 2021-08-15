import type { NextPage } from 'next'
import React from 'react';
import { Container } from '../components/container/container'
import { Wallpaper } from '../components/wallpaper/wallpaper'
import { Typewriter } from 'react-simple-typewriter'

import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <React.Fragment>

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
            <span className={styles.letterEmphasis}>I</span> love web development, low-level coding that makes me learn new stuff, and I am also a free software advocate. Just tell me about
            anything IT related, and I will listen to you carefully!
          </p>

          <p className={styles.introduction}>
            <span className={styles.letterEmphasis}>M</span>oreover, I also like to read, especially philosophy and classical litterature. This has nothing to do with IT, but it gives me a lot of new ideas, such as this landing page!
          </p>


          <img src='/me.jpeg' className={styles.aurelienImage} />

          <h2 className={styles.scrollCta}>Scroll to discover my work</h2>

          <div className={styles.arrow}>
            <span></span>
          </div>

        </Container>

      </Container>

    </ React.Fragment>
  )
} 

export default Home
