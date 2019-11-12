// @ts-nocheck
import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/react-hooks'
import Link from 'next/link'
import { Title } from '../../ui'
import { GET_POPULAR_PROJECTS } from '../../graphql/queries/project/popularProjects'
import Popular from '../../components/Popular'
import Footer from '../../components/Footer'
import Promo from '../../components/Promo'
// @ts-nocheck
import styled from 'styled-components'
import UiButton from '../../ui/Button'
import UiText from '../../ui/Text'
import { DEVICE } from '../../ui/constants'

const Hero = styled.section`
  width: 100%;
  height: calc(100vh - 98px);
  background: black;
  overflow: hidden;
  position: relative;

  &:before {
    position: absolute;
    content: '';
    z-index: 1;
    width: 100%;
    height: 100%;
    background: rgba(000, 000, 000, 0.5);
  }

  @media ${DEVICE.TABLET} {
    height: auto;

    h1 {
      font-size: 48px;
      line-height: 56px;
    }

    div {
      padding-top: 160px;
      padding-bottom: 95px;
    }
  }
`

const Signup = styled(UiButton)`
  background: white;
  padding: 0 50px;
  height: 50px;
  border: none;
  margin-top: 45px;
`

const Description = styled(UiText)`
  margin-top: 10px;
`

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`

const Inner = styled.div`
  max-width: 1060px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  padding-top: ${props => props.paddingTop || '0'}px;
  align-items: ${props => props.alignItems || 'flex-start'};
  justify-content: ${props => props.justifyContent || 'center'};
  flex-direction: ${props => props.direction || 'column'};
  height: 100%;
  position: relative;
  z-index: 10;

  @media ${DEVICE.TABLET} {
    padding: 20px 20px 0 20px;
    box-sizing: border-box;
    flex-direction: column;
    width: 100%;
  }
`

const Projects = styled.section`
  max-width: 1060px;
  width: 100%;
  margin: 0 auto;
  padding-top: 80px;

  @media ${DEVICE.TABLET} {
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 45px;
    box-sizing: border-box;

    h1 {
      font-size: 36px;
      line-height: 45px;
    }
  }
`

const AppPromo = styled.section`
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
  background: black;
  margin-top: 90px;
  padding-top: 60px;
  display: flex;
  align-items: center;
  flex-direction: row;

  @media ${DEVICE.TABLET} {
    padding-top: 0;
  }
`

const ExploreLink = styled.a`
  cursor: pointer;
  border-bottom: 1.5px solid black;
  font-weight: 500;
`

const AppScreens = styled.picture`
  width: 482px;
  height: 524px;
  align-self: flex-end;

  img {
    width: 100%;
  }
`

const Stores = styled.div`
  padding-bottom: 80px;
`

const Store = styled.img`
  margin: 0 5px;
  display: none;

  @media ${DEVICE.TABLET} {
    display: initial;
  }
`

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
        <Video autoPlay muted playsInline>
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

          <Stores>
            <Store src={require('./app-store.svg')} />
            <Store src={require('./google-play.svg')} />
          </Stores>

          <AppScreens>
            <source
              srcSet={`${require('./phones.jpg?webp')} 1x, ${require('./phones@2x.jpg?webp')} 2x, ${require('./phones@2x.jpg?webp')} 3x`}
              type="image/webp"
            />
            <source
              srcSet={`${require('./phones.jpg')} 1x, ${require('./phones@2x.jpg')} 2x, ${require('./phones@2x.jpg')} 3x`}
              type="image/jpeg"
            />
            <img src={require('./phones.jpg')} />
          </AppScreens>
        </Inner>
      </AppPromo>

      <Footer />
    </Fragment>
  )
}
