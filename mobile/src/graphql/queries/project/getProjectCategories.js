import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const getProjectCategoriesQuery = gql`
  query getProjectCategories {
    categories: projectCategories {
      id
      title
      image {
        uri
      }
    }
  }
`

const getProjectCategoriesOptions = {
  props: ({ data: { categories, loading } }) => ({
    categories,
    isFetching: loading,
  }),
}

export const getProjectCategories = graphql(getProjectCategoriesQuery, getProjectCategoriesOptions)
