import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-apollo-hooks'
import Link from 'next/link'
import { Title } from '../../ui'
import { GET_POPULAR_PROJECTS } from '../../graphql/queries/project/popularProjects'
import Popular from '../../components/Popular'
import Footer from '../../components/Footer'
import Promo from '../../components/Promo'
import {
  Hero,
  Video,
  Inner,
  Projects,
  AppPromo,
  Description,
  ExploreLink,
  AppScreens,
  Signup,
} from './styles'

const VIDEO_URL = 'https://edge-files.wrench.cc/static/video/landing.mp4'

export default function Home(props) {
  const { t } = useTranslation()
  const { data, loading } = useQuery(GET_POPULAR_PROJECTS, {
    variables: {
      first: 8,
    },
  })

  if (loading) {
    return null
  }

  return (
    <Fragment>
      <Hero>
        <Inner paddingTop={50}>
          <Title color="white" fontSize={92} lineHeight={104}>
            {t('home:title')} <br />
            {t('home:subtitle')}
          </Title>
          <Description color="white" fontSize={19}>
            {t('home:description')}
          </Description>
          <Signup>{t('home:signup')}</Signup>
        </Inner>
        <Video autoPlay muted>
          <source src={VIDEO_URL} type="video/mp4" />
        </Video>
      </Hero>

      <Projects>
        <Popular projects={data.projects} />

        <Link href="/explore">
          <ExploreLink>{t('home:explore')}</ExploreLink>
        </Link>
      </Projects>

      <AppPromo>
        <Inner direction="row" alignItems="center" justifyContent="space-between">
          <Promo inverted sticky={false} viewerCountry={props.viewerCountry} />
          <AppScreens src="/static/phones@2x.jpg" />
        </Inner>
      </AppPromo>

      <Footer />
    </Fragment>
  )
}
