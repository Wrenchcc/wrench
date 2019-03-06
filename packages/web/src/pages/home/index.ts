import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-apollo-hooks'
import Link from 'next/link'
import { Title, Text } from '../../ui'
import { GET_POPULAR_PROJECTS } from '../../graphql/queries/project/popularProjects'
import Popular from '../../components/Popular'
import Promo from '../../components/Promo'
import { Hero, Inner, Projects, AppPromo, Blah } from './styles'

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
        <Inner>
          <Title color="white" fontSize={92} lineHeight={104}>
            {t('home:title')} <br />
            {t('home:subtitle')}
          </Title>
          <Text color="white">{t('home:description')}</Text>
        </Inner>
      </Hero>

      <Projects>
        <Popular projects={data.projects} />

        <Link href="/explore">
          <Blah>{t('home:explore')}</Blah>
        </Link>
      </Projects>

      <AppPromo>
        <Inner>
          <Promo inverted sticky={false} />
          {t('home:promo')}
        </Inner>
      </AppPromo>
    </Fragment>
  )
}
