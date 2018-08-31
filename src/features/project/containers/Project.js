import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-native'
import { pathOr, equals } from 'ramda'
import { compose } from 'react-apollo'
import { getProject } from 'graphql/queries/project/getProject'
import { navigateToUser } from 'navigation'
import { InfiniteList, Post, Avatar, HeaderTitle, Edit } from 'ui'
import Header from '../components/Header'
import Footer from '../components/Footer'

// TODO: make platform specific and translate
const FOOTER_HEIGHT = 500
const START_OPACITY = 50

let scrollView = null

// TODO: Load user data from project?
class Project extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {}
    const isOwner = pathOr(false, ['project', 'projectPermissions', 'isOwner'], params)
    const projectTitle = pathOr(false, ['project', 'title'], params)
    const goToProfile = () => navigateToUser({ user: params.user })
    const avatarUrl = pathOr(null, ['user', 'avatarUrl'], params)

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
    project: PropTypes.object,
    navigation: PropTypes.object.isRequired,
    posts: PropTypes.array,
    fetchMore: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
    isRefetching: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
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
  componentWillReceiveProps(nextProps) {
    if (!equals(this.props.project, nextProps.project)) {
      this.props.navigation.setParams({ project: nextProps.project })
    }
  }

  // TODO: Mutate state
  toggleFollow = () => {}

  componentWillUnmont() {
    scrollView = null
  }

  renderItem = ({ item }) => (
    <Post data={item.node} avatar={false} onPost onLongPress={this.toggleActionSheet} />
  )

  renderFooter = () => {
    const { project } = this.props
    return (
      project.projectPermissions && (
        <Footer
          translateY={this.footerY}
          name={project.title}
          dynamicLink={project.dynamicLink}
          following={project.projectPermissions.isFollower}
          onFollowPress={this.toggleFollow}
        />
      )
    )
  }

  render() {
    const { posts, project, fetchMore, refetch, isRefetching, isFetching, hasNextPage } = this.props

    // TODO: Remove when have IDs
    return (
      <Fragment>
        <InfiniteList
          defaultPaddingTop
          withKeyboardHandler
          ListHeaderComponent={project.title && <Header project={project} />}
          data={posts}
          refetch={refetch}
          fetchMore={fetchMore}
          isRefetching={isRefetching}
          isFetching={isFetching}
          hasNextPage={hasNextPage}
          keyExtractor={(item, index) => item.node.id + index}
          renderItem={this.renderItem}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.scrollY } } }], {
            useNativeDriver: true,
          })}
          scrollRef={ref => {
            scrollView = ref
          }}
        />
        {this.renderFooter()}
      </Fragment>
    )
  }
}

export default compose(getProject)(Project)
