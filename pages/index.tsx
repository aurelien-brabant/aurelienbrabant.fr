import type { NextPage } from 'next'
import React from 'react';
import { Container } from '../components/container/container'
import { Typewriter } from 'react-simple-typewriter'

import styles from '../styles/Home.module.css'
import {Card} from '../components/card/card';

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
            <span className={styles.letterEmphasis}>I</span> ❤️ web development, low-level coding that makes me learn new stuff, and I am also a free software advocate. Just tell me about
            anything IT related, and I will listen to you carefully!
          </p>

          <p className={styles.introduction}>
            <span className={styles.letterEmphasis}>M</span>oreover, I also like to read, especially philosophy and classical litterature. This has nothing to do with IT, but it gives me a lot of new ideas, such as this landing page!
          </p>


          <img src='/me.jpeg' className={styles.aurelienImage} />

          <h2 className={styles.scrollCta}>Scroll to discover my work</h2>

          <div className={styles.arrow}>
            <span></span>
            <span></span>
          </div>

        </Container>
      </Container>

      { /* I am a writer */ }

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
            <Card
              title='Cub3D'
              subtitle='Duration: about 2 months'
              imageCoverUrl='/landing_bg.jpeg'
              description="Using the raycasting principle, I created a simple clone of the well known wolfenstein 3D game from the 90's"
            >
            </Card>

            <Card
              title='Minishell'
              subtitle='Duration: about 1 month'
              imageCoverUrl='/landing_bg.jpeg'
              description={`My first teamwork project. We've recreated a simple UNIX command line interpreter, also known as "shell".`}
            >
            </Card>


            <Card
              title='Inception'
              subtitle='Duration: about 1 week'
              imageCoverUrl='/landing_bg.jpeg'
              description="Setup a wordpress installation working with a mariadb database, plus additional services such as redis, using docker and docker-compose."
            >
            </Card>

            <Card
              title='libft'
              subtitle='Duration: 10 months'
              imageCoverUrl='/landing_bg.jpeg'
              description="My very own C programming library, that I've wrote to help me write elegant and efficient C code during the first part of my cursus at 42. I'm very proud of it as it has a lot of useful stuff in it."
            >
            </Card>

            <Card
              title='PTYS'
              subtitle='Duration: 1 day'
              imageCoverUrl='/landing_bg.jpeg'
              description="A very small C framework designed to help 42 students to test their ft_printf project without all the hassle."
            >
            </Card>


          </div>
            </Container>
        </Container>

    </ React.Fragment>
  )
} 

export default Home
