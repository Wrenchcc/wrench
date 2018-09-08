import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import projectInfoFragment from 'graphql/fragments/project/projectInfo'

const followProjectMutation = gql`
  mutation followProject($id: ID!) {
    followProject(id: $id) {
      ...projectInfo
    }
  }
  ${projectInfoFragment}
`

const followProjectOptions = {
  props: ({ mutate }) => ({
    followProject: id => mutate({
      variables: {
        id,
      },
      // optimisticResponse: {
      //   __typename: 'Mutation',
      //   followProject: {
      //     id: fakeId,
      //     threadId: ownProps.thread.id,
      //     type: 'like',
      //     __typename: 'ThreadReaction',
      //   },
      // },
      // update: (store, { data: { followProject } }) => {
      //   const data = store.readQuery({
      //     query: getThreadByIdQuery,
      //     variables: {
      //       id: ownProps.thread.id,
      //     },
      //   })
      //
      //   // ignore the server response and only update the cache with the
      //   // optimistic response
      //   if (typeof followProject.id === 'string') return
      //
      //   data.thread.reactions.count++
      //   data.thread.reactions.hasReacted = true
      //
      //   // Write our data back to the cache.
      //   store.writeQuery({
      //     query: getThreadByIdQuery,
      //     data,
      //     variables: {
      //       id: ownProps.thread.id,
      //     },
      //   })
      // },
    }),
  }),
}

export const followProject = graphql(followProjectMutation, followProjectOptions)
