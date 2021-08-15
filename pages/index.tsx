import type { NextPage } from 'next'
import { Container } from '../components/container/container'
import landingBackground from 'landing-bg.jpeg'

const Home: NextPage = () => {
  return (
    <Container
      fillPageHeight={true}
      backgroundImageUrl='/landing_bg.jpeg'
    >
      <h1> Hello world </h1>
    </Container>
  )
} 

export default Home
