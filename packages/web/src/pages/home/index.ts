import React, { Fragment } from 'react'
import { useQuery } from 'react-apollo-hooks'
import Link from 'next/link'
import { Title, Text } from '../../ui'
import { GET_POPULAR_PROJECTS } from '../../graphql/queries/project/popularProjects'
import Popular from '../../components/Popular'
import Promo from '../../components/Promo'
import { Hero, Inner, Projects, AppPromo, Blah } from './styles'

export default function Home(props) {
  const { data, loading } = useQuery(GET_POPULAR_PROJECTS, {
    variables: {
      first: 4,
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
            Post, explore <br />
            and learn.
          </Title>
          <Text color="white">Post your projects, explore others and learn from each other.</Text>
        </Inner>
      </Hero>

      <Projects>
        <Popular projects={data.projects} />

        <Link href="/explore">
          <Blah>Explore more projects</Blah>
        </Link>
      </Projects>

      <AppPromo>
        <Inner>
          <Promo inverted sticky={false} />
          Download the Wrench app on both Appstore or Google play and upload your projects now.
        </Inner>
      </AppPromo>
    </Fragment>
  )
}
