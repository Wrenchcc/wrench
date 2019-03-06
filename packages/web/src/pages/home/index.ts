import React, { Fragment } from 'react'
import { useQuery } from 'react-apollo-hooks'
import { Title, Text } from '../../ui'
import { GET_POPULAR_PROJECTS } from '../../graphql/queries/project/popularProjects'
import Popular from '../../components/Popular'
import { Hero, Inner, Section } from './styles'

export default function Home(props) {
  const { data, loading } = useQuery(GET_POPULAR_PROJECTS, {
    variables: {
      first: 4,
    },
  })

  if (loading) {
    return null
  }

  console.log(data)

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

      <Section>
        <Popular projects={data.projects} />
      </Section>
    </Fragment>
  )
}
