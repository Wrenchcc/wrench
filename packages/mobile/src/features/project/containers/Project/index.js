import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { pathOr } from 'ramda'
import { compose } from 'react-apollo'
import { Layout, FlatList } from 'navigation'
import withTranslation from 'i18n/withTranslation'
import { getProject } from 'graphql-old/queries/project/getProject'
import { followProject } from 'graphql-old/mutations/project/followProject'
import { Post, Avatar, HeaderTitle, Edit, EmptyState, Title } from 'ui'
import { TYPES } from 'ui/EmptyState/constants'
import Header from 'features/project/components/Header'
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
  const renderFooter = () => project
    && project.projectPermissions && (
      <Footer
        name={project.title}
        dynamicLink={project.dynamicLink}
        following={project.projectPermissions.isFollower}
        isOwner={project.projectPermissions.isOwner}
        onPress={() => followProject(project.id)}
      />
  )

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
        ListHeaderComponent={null}
        data={posts}
        refetch={refetch}
        fetchMore={fetchMore}
        isRefetching={isRefetching}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        keyExtractor={item => item.node.id}
        renderItem={({ item }) => <Post post={item.node} avatar={false} withoutTitle />}
      />
      {renderFooter()}
    </Layout>
  )
}

Project.propTypes = {
  fetchMore: PropTypes.func.isRequired,
  followProject: PropTypes.func.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isRefetching: PropTypes.bool.isRequired,
  post: PropTypes.object,
  posts: PropTypes.array,
  project: PropTypes.object,
  refetch: PropTypes.func.isRequired,
}

export default compose(
  getProject,
  followProject,
  withTranslation('Project')
)(Project)

//
//
// class Project extends PureComponent {
//   // static navigationOptions = ({ navigation }) => {
//   //   const params = navigation.state.params || {}
//   //   const user = pathOr(null, ['project', 'user'], params)
//   //   const isOwner = pathOr(false, ['project', 'projectPermissions', 'isOwner'], params)
//   //   const projectTitle = pathOr(false, ['project', 'title'], params)
//   //   const goToProfile = () => navigateToUser({ user })
//   //   const avatarUrl = pathOr(null, ['avatarUrl'], user)
//   //
//   //   return {
//   //     headerTitle: projectTitle && (
//   //       <HeaderTitle
//   //         opacity={params.opacity || new Animated.Value(0)}
//   //         onPress={() => scrollView.scrollToOffset({ offset: 0 })}
//   //       >
//   //         {projectTitle}
//   //       </HeaderTitle>
//   //     ),
//   //     headerRight: isOwner ? (
//   //       <Edit project={params.project} />
//   //     ) : (
//   //       <Avatar uri={avatarUrl || ''} onPress={goToProfile} />
//   //     ),
//   //   }
//   // }
//
// static propTypes = {
//   fetchMore: PropTypes.func.isRequired,
//   followProject: PropTypes.func.isRequired,
//   hasNextPage: PropTypes.bool.isRequired,
//   isFetching: PropTypes.bool.isRequired,
//   isRefetching: PropTypes.bool.isRequired,
//   post: PropTypes.object,
//   posts: PropTypes.array,
//   project: PropTypes.object,
//   refetch: PropTypes.func.isRequired,
// }
//
//   renderItem = ({ item }) => {
//     // Remove post item from list to skip dublicated
//     if (pathOr(false, ['post', 'id'], this.props) === item.node.id) {
//       return null
//     }
//
//     return <Post post={item.node} avatar={false} withoutTitle />
//   }
//
//   renderHeader = () => {
//     let content
//
//     const { post, posts, project, t } = this.props
//     const hasPosts = posts && posts.length > 0
//
//     if (post) {
//       content = (
//         <>
//           <Post post={post} withoutTitle />
//           {hasPosts && posts.length > 1 && (
//             <View style={{ paddingTop: 40, paddingBottom: 30 }}>
//               <Title medium>{t('Project:recent')}</Title>
//             </View>
//           )}
//         </>
//       )
//     }
//
//     return (
//       <>
//         {project.title && <Header project={project} />}
//         {content}
//       </>
//     )
//   }
//
//   renderFooter = () => {
//     const { project, followProject } = this.props
//
//     return (
//       project.projectPermissions && (
//         <Footer
//           name={project.title}
//           dynamicLink={project.dynamicLink}
//           following={project.projectPermissions.isFollower}
//           isOwner={project.projectPermissions.isOwner}
//           onPress={() => followProject(project.id)}
//         />
//       )
//     )
//   }
//
//   render() {
//     const { posts, project, fetchMore, refetch, isRefetching, isFetching, hasNextPage } = this.props
//
//     const emptyState = project.projectPermissions && project.projectPermissions.isOwner
//       ? TYPES.PROJECT_POST
//       : TYPES.PROJECT_NO_POSTS
//     const hasPosts = posts && posts.length > 0
//
//     return (
//       <Layout>
//         <FlatList
//           spacingSeparator
//           contentContainerStyle={{ flex: hasPosts ? 0 : 1 }}
//           defaultPaddingTop
//           ListEmptyComponent={<EmptyState type={emptyState} />}
//           ListHeaderComponent={this.renderHeader}
//           data={posts}
//           refetch={refetch}
//           fetchMore={fetchMore}
//           isRefetching={isRefetching}
//           isFetching={isFetching}
//           hasNextPage={hasNextPage}
//           keyExtractor={item => item.node.id}
//           renderItem={this.renderItem}
//         />
//         {this.renderFooter()}
//       </Layout>
//     )
//   }
// }
//
// export default compose(
//   getProject,
//   followProject,
//   withTranslation('Project')
// )(Project)
