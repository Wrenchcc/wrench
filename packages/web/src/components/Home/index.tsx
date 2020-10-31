// @ts-nocheck
import React from 'react'
import { useTranslation } from 'i18n'
import Link from 'next/link'
import Seo from 'utils/seo'
import { Title } from 'ui'
import Popular from 'components/Popular'
import Footer from 'components/Footer'
import AppPromo from 'components/AppPromo'
import Login from 'components/Login'
import ProjectTypes from 'components/ProjectTypes'
import { Modal, useModal } from 'ui/Modal'
import { Hero, Inner, Signup, Description, Video, Projects, ExploreLink } from './styles'

const VIDEO_URL = 'https://edge-files.wrench.cc/static/video/landing-v5.mp4'

function Home(props) {
  const { t } = useTranslation('home')

  const [showModal, closeModal] = useModal(() => (
    <Modal close={closeModal}>
      <Login closeModal={closeModal} />
    </Modal>
  ))

  return (
    <>
      <Seo
        config={{
          titleTemplate: t('document_title'),
        }}
      />

      <Hero>
        <Inner paddingTop={50}>
          <Title color="white" fontSize={120} lineHeight={128}>
            {t('title')} <br />
            {t('subtitle')}
          </Title>
          <Description color="white" fontSize={19}>
            {t('description')}
          </Description>
          <Signup onPress={showModal}>{t('signup')}</Signup>
        </Inner>
        <Video autoPlay muted playsInline>
          <source src={VIDEO_URL} type="video/mp4" />
        </Video>
      </Hero>

      <Inner paddingTop={60}>
        <ProjectTypes />
      </Inner>

      <Projects>
        <Popular />

        <Link href="/explore">
          <ExploreLink>{t('explore')}</ExploreLink>
        </Link>
      </Projects>

      <AppPromo viewerCountry={props.viewerCountry} />

      <Footer />
    </>
  )
}

Home.getInitialProps = () => ({
  namespacesRequired: ['home'],
})

export default Home
