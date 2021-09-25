import type { NextPage } from 'next'
import React, {ReactNode} from 'react';
import Head from 'next/head';
import { Container } from '../components/container/container'
import { Button } from '../components/button/button';
import Carousel from 'react-multi-carousel';

import styles from '../styles/Home.module.css'
import 'react-multi-carousel/lib/styles.css'
import {Card} from '../components/card/card';
import { landingPosts } from '../data/landing_posts';
import Link from 'next/link';

type Technology =
{
  name: string;
  imageUrl: string;
}

const projectsCarouselResponsive = {
	desktop: {
	  breakpoint: { max: 3000, min: 1900 },
	  items: 4,
	},
	mediumDesktop: {
		breakpoint: { max: 2000, min: 1000 },
		items: 3,
	},
	smallDesktop: {
		breakpoint: { max: 1400, min: 1024 },
		items: 2
	},
	tablet: {
	  breakpoint: { max: 1024, min: 464 },
	  items: 2,
	},
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    }
};

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
      <Head>
        <title>Web developer | Aurélien Brabant</title>
        <meta
          name="description"
          content="My name is Aurélien, I'm a web developer. Need your own website done right? Let's get in touch!"
        />
        <meta name="robots" content="index, follow" />
      </Head>
      <Container
        backgroundImage={{
          url: '/cabane_rognes_chamonix.jpg',
          rgbaColor: 'rgba(0, 0, 0, 0.7)',
        }}
        limitedWidth={false}
      >

        <Container
          className={styles.mainContainer}
        >
		
		<div className={styles.introduction}>
			<h1 className={styles.introduction}>
				Hey, I'm Aurélien
				<span className={styles.colorEmphase}>.</span>
			</h1>

			<h3>
			  I'm a software engineer who makes websites and many other things
			  <span className={styles.colorEmphase}>.</span>
			</h3>
		</div>

		  <Carousel responsive={projectsCarouselResponsive}
			  autoPlay={true}
			  autoPlaySpeed={1500}
			  infinite={true}
			 containerClass={styles.carousel}
		  >
		  { renderLandingPosts() }
		  </Carousel>


        </Container>
      </Container>



      { /* I am a writer */ }


      <Container className={styles.technologiesContainer}>
        <h2> You and I love technology, right ? </h2>
        <h3> Here is what I work with </h3>
        <div className={styles.technologies}>
          { technologies.map(technology => (
              <img
                key={technology.name}
                alt={technology.name}
                src={technology.imageUrl} 
              />
          ))}
        </div>
        <div
          className={styles.cta}
        >
          <h2> Interested in my skills? </h2>
          <Link href="/contact"><a>{"Let's get in touch!"}</a></Link>
        </div>
      </Container>

      <Container
        limitedWidth={false}
        backgroundImage= {{
          url: '/spyglass.jpeg',
          rgbaColor: 'rgba(0, 0, 0, 0.85)',
        }}
		className={styles.blogSection}
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
