import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-native'
import { pathOr, equals } from 'ramda'
import { compose } from 'react-apollo'
import { getProject } from 'graphql/queries/project/getProject'
import { followProject } from 'graphql/mutations/project/followProject'
import { navigateToUser } from 'navigation'
import { InfiniteListWithHandler, Post, Avatar, HeaderTitle, Edit } from 'ui'
import Header from '../components/Header'
import Footer from '../components/Footer'

// TODO: make platform specific and translate
const FOOTER_HEIGHT = 500
const START_OPACITY = 50

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
          onPress={() => this.scrollView.scrollToOffset({ offset: 0 })}
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

  scrollView = null

  static propTypes = {
    project: PropTypes.object,
    navigation: PropTypes.object.isRequired,
    posts: PropTypes.array,
    fetchMore: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
    isRefetching: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
    followProject: PropTypes.func.isRequired,
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
        inputRange: [START_OPACITY, FOOTER_HEIGHT + START_OPACITY],
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

  renderItem = ({ item }) => <Post post={item.node} avatar={false} onPost />

  renderFooter = () => {
    const { project, followProject } = this.props

    return (
      project.projectPermissions && (
        <Footer
          translateY={this.footerY}
          name={project.title}
          dynamicLink={project.dynamicLink}
          following={project.projectPermissions.isFollower}
          onFollowPress={() => followProject(project.id)}
        />
      )
    )
  }

  render() {
    const { posts, project, fetchMore, refetch, isRefetching, isFetching, hasNextPage } = this.props

    return (
      <>
        <InfiniteListWithHandler
          defaultPaddingTop
          ListHeaderComponent={project.title && <Header project={project} />}
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
            this.scrollView = ref
          }}
        />
        {this.renderFooter()}
      </>
    )
  }
}

export default compose(
  getProject,
  followProject
)(Project)
