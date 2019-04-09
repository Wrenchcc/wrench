import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'
import { Layout, FlatList } from 'navigation'
import withTranslation from 'i18n/withTranslation'
import { getProject } from 'graphql-old/queries/project/getProject'
import { followProject } from 'graphql-old/mutations/project/followProject'
import { Post, Avatar, Edit, EmptyState } from 'ui'
import { TYPES } from 'ui/EmptyState/constants'
import ProjectHeader from 'components/ProjectHeader'
import Footer from 'features/project/components/Footer'

function Project({
  posts,
  project,
  fetchMore,
  refetch,
  isRefetching,
  isFetching,
  hasNextPage,
  followProject,
}) {
  const emptyState = project && project.projectPermissions && project.projectPermissions.isOwner
    ? TYPES.PROJECT_POST
    : TYPES.PROJECT_NO_POSTS
  const hasPosts = posts && posts.length > 0

  return (
    <Layout>
      <FlatList
        spacingSeparator
        contentContainerStyle={{ flex: hasPosts ? 0 : 1 }}
        defaultPaddingTop
        ListEmptyComponent={<EmptyState type={emptyState} />}
        ListHeaderComponent={
          project && (
            <ProjectHeader id={project.id} title={project.title} followers={project.followers} />
          )
        }
        data={posts}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        keyExtractor={item => item.node.id}
        renderItem={({ item }) => <Post post={item.node} avatar={false} withoutTitle />}
      />
      {project && project.projectPermissions && (
        <Footer
          name={project.title}
          dynamicLink={project.dynamicLink}
          following={project.projectPermissions.isFollower}
          isOwner={project.projectPermissions.isOwner}
          onPress={() => followProject(project.id)}
        />
      )}
    </Layout>
  )
}

Project.propTypes = {
  fetchMore: PropTypes.func.isRequired,
  followProject: PropTypes.func.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isRefetching: PropTypes.bool.isRequired,
  // post: PropTypes.object,
  posts: PropTypes.array,
  project: PropTypes.object,
  refetch: PropTypes.func.isRequired,
}

export default compose(
  getProject,
  followProject,
  withTranslation('Project')
)(Project)
