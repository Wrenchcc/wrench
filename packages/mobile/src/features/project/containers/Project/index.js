import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Animated, View } from 'react-native'
import { pathOr, equals } from 'ramda'
import { compose } from 'react-apollo'
import withTranslation from 'i18n/withTranslation'
import { getProject } from 'graphql/queries/project/getProject'
import { followProject } from 'graphql/mutations/project/followProject'
import { navigateToUser } from 'navigation/actions'
import {
  InfiniteListWithHandler,
  Post,
  Avatar,
  HeaderTitle,
  Edit,
  EmptyState,
  Title,
  LazyLoad,
} from 'ui'
import { TYPES } from 'ui/EmptyState/constants'
import Header from 'features/project/components/Header'
import Footer from 'features/project/components/Footer'

const FOOTER_HEIGHT = 600

let scrollView = null

class Project extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {}
    const user = pathOr(null, ['project', 'user'], params)
    const isOwner = pathOr(false, ['project', 'projectPermissions', 'isOwner'], params)
    const projectTitle = pathOr(false, ['project', 'title'], params)
    const goToProfile = () => navigateToUser({ user })
    const avatarUrl = pathOr(null, ['avatarUrl'], user)

    return {
      headerTitle: projectTitle && (
        <HeaderTitle
          opacity={params.opacity || new Animated.Value(0)}
          onPress={() => scrollView.scrollToOffset({ offset: 0 })}
        >
          {projectTitle}
        </HeaderTitle>
      ),
      headerRight: isOwner ? (
        <Edit project={params.project} />
      ) : (
        <Avatar uri={avatarUrl || ''} onPress={goToProfile} />
      ),
    }
  }

  static propTypes = {
    fetchMore: PropTypes.func.isRequired,
    followProject: PropTypes.func.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isRefetching: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired,
    post: PropTypes.object,
    posts: PropTypes.array,
    project: PropTypes.object,
    refetch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.scrollY = new Animated.Value(0)

    this.footerY = Animated.diffClamp(
      this.scrollY.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: 'clamp',
      }),
      0,
      FOOTER_HEIGHT
    )

    props.navigation.setParams({
      opacity: this.scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 1],
      }),
    })
  }

  // Add project to navigationOptions when loaded
  componentDidUpdate(prevProps) {
    if (!equals(this.props.project, prevProps.project)) {
      this.props.navigation.setParams({ project: this.props.project })
    }
  }

  renderItem = ({ item }) => {
    // Remove post item from list to skip dublicated
    if (pathOr(false, ['post', 'id'], this.props) === item.node.id) {
      return null
    }

    return (
      <LazyLoad>
        <Post post={item.node} avatar={false} onPost />
      </LazyLoad>
    )
  }

  renderHeader = () => {
    let content

    const { post, posts, project, t } = this.props
    const hasPosts = posts && posts.length > 0

    if (post) {
      content = (
        <>
          <Post post={post} avatar={false} onPost />
          {hasPosts && posts.length > 1 && (
            <View style={{ mariginTop: 10, marginBottom: 30 }}>
              <Title medium>{t('Project:recent')}</Title>
            </View>
          )}
        </>
      )
    }

    return (
      <>
        {project.title && <Header project={project} spacingHorizontal={!hasPosts} />}
        {content}
      </>
    )
  }

  renderFooter = () => {
    const { project, followProject } = this.props

    return (
      project.projectPermissions && (
        <Footer
          translateY={this.footerY}
          name={project.title}
          dynamicLink={project.dynamicLink}
          following={project.projectPermissions.isFollower}
          isOwner={project.projectPermissions.isOwner}
          onFollowPress={() => followProject(project.id)}
        />
      )
    )
  }

  render() {
    const { posts, project, fetchMore, refetch, isRefetching, isFetching, hasNextPage } = this.props

    const emptyState = project.projectPermissions && project.projectPermissions.isOwner
      ? TYPES.PROJECT_POST
      : TYPES.PROJECT_NO_POSTS
    const hasPosts = posts && posts.length > 0

    return (
      <>
        <InfiniteListWithHandler
          scrollEnabled={hasPosts}
          paddingHorizontal={hasPosts ? 20 : 0}
          contentContainerStyle={{ flex: hasPosts ? 0 : 1 }}
          defaultPaddingTop
          ListEmptyComponent={<EmptyState type={emptyState} />}
          ListHeaderComponent={this.renderHeader}
          data={posts}
          refetch={refetch}
          fetchMore={fetchMore}
          isRefetching={isRefetching}
          isFetching={isFetching}
          hasNextPage={hasNextPage}
          keyExtractor={item => item.node.id}
          renderItem={this.renderItem}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.scrollY } } }], {
            useNativeDriver: true,
          })}
          scrollRef={ref => {
            scrollView = ref
          }}
        />
        {this.renderFooter()}
      </>
    )
  }
}

export default compose(
  getProject,
  followProject,
  withTranslation('Project')
)(Project)
