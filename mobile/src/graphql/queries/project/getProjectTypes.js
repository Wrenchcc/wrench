import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const getProjectTypesQuery = gql`
  query getProjectTypes {
    types: projectTypes {
      id
      title
      imageUrl
    }
  }
`

const getProjectTypesOptions = {
  props: ({ data: { types, loading } }) => ({
    types,
    isFetching: loading,
  }),
}

export const getProjectTypes = graphql(getProjectTypesQuery, getProjectTypesOptions)
