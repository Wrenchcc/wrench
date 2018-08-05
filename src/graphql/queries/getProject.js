import { graphql } from 'react-apollo'
import { getProjectId } from 'navigation/utils/selectors'
import { mapListProps } from 'graphql/utils/mapListProps'
import getProjectQuery from 'graphql/queries/getProject.graphql'

const getProjectOptions = {
  options: ({ navigation }) => ({
    variables: {
      projectId: getProjectId(navigation),
    },
    fetchPolicy: 'cache-and-network',
  }),
  props: mapListProps('project'),
}

export const getProject = graphql(getProjectQuery, getProjectOptions)
