import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Animated, Alert } from 'react-native'
import { pathOr } from 'ramda'
import { compose } from 'react-apollo'
import { getProject } from 'graphql/queries/getProject'
import { navigateToProfile } from 'navigation'
import { InfiniteList, ActionSheet, Post, Avatar, HeaderTitle, Edit } from 'ui'
import Header from '../components/Header'
import Footer from '../components/Footer'

// TODO: make platform specific and translate
const FOOTER_HEIGHT = 500
const START_OPACITY = 50

let scrollView = null

class Project extends Component {
  // TODO: Fix headerTitle not showing some times
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {}
    const isOwner = pathOr(false, ['project', 'permissions', 'isOwner'], params)
    const projectName = pathOr(false, ['project', 'name'], params)

    return {
      headerTitle: projectName && (
        <HeaderTitle
          opacity={params.opacity || new Animated.Value(0)}
          onPress={() => scrollView.scrollToOffset({ offset: 0 })}
        >
          {projectName}
        </HeaderTitle>
      ),
      headerRight: isOwner ? (
        <Edit project={params.project} />
      ) : (
        <Avatar
          uri={params.user.avatarUrl}
          onPress={() => navigateToProfile({ user: params.user })}
        />
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

    this.state = {
      isOpen: false,
    }

    this.actionsheetOptions = [
      { name: 'Edit post', onSelect: () => Alert('Not yet!') },
      { name: 'Delete post', onSelect: () => Alert('Not yet!') },
      { name: 'Cancel' },
    ]
  }

  // TODO: Mutate state
  toggleFollow = () => {}

  toggleActionSheet = () => this.setState(prevState => ({ isOpen: !prevState.isOpen }))

  componentWillUnmont() {
    scrollView = null
  }

  renderItem = ({ item }) => (
    <Post data={item.node} avatar={false} onPost onLongPress={this.toggleActionSheet} />
  )

  render() {
    const {
      navigation,
      project,
      posts,
      fetchMore,
      refetch,
      isRefetching,
      isFetching,
      hasNextPage,
    } = this.props

    const { project: navigationProject } = navigation.state.params

    return (
      <Fragment>
        <InfiniteList
          defaultPaddingTop
          withKeyboardHandler
          ListHeaderComponent={<Header name={navigationProject.name} followers={123} />}
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
        {!isFetching && (
          <Fragment>
            <Animated.View style={{ transform: [{ translateY: this.footerY }] }}>
              <Footer
                name={navigationProject.name}
                id={navigationProject.id}
                following={project.permissions.isFollowing}
                onFollowPress={this.toggleFollow}
              />
            </Animated.View>
            <ActionSheet
              isOpen={this.state.isOpen}
              onClose={this.toggleActionSheet}
              options={this.actionsheetOptions}
            />
          </Fragment>
        )}
      </Fragment>
    )
  }
}

export default compose(getProject)(Project)
