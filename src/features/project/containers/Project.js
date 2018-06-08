import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Animated, Alert } from 'react-native'
import { navigateToProfile } from 'navigation'
import { AnimatedFlatList, ActionSheet, Post, Avatar, HeaderTitle, Edit } from 'ui'
import data from 'fixtures/projects'
import currentUser from 'fixtures/currentUser'
import Header from '../components/Header'
import Footer from '../components/Footer'

// TODO: make platform specific
const FOOTER_HEIGHT = 500
const START_OPACITY = 50

let scrollView = null

export default class Project extends Component {
  static defaultProps = {
    project: data[0],
  }

  static propTypes = {
    project: PropTypes.object,
    navigation: PropTypes.object.isRequired,
  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {}
    const ownerId = params.project.owner && params.project.owner.id
    const isOwner = currentUser().id === ownerId

    return {
      headerTitle: (
        <HeaderTitle
          opacity={params.opacity || 0}
          onPress={() => scrollView.scrollToOffset({ offset: 0 })}
        >
          {params.project.name}
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
      following: props.project.following,
    }

    this.actionsheetOptions = [
      { name: 'Edit post', onSelect: () => Alert('Not yet!') },
      { name: 'Delete post', onSelect: () => Alert('Not yet!') },
      { name: 'Cancel' },
    ]
  }

  componentWillUnmont() {
    scrollView = null
  }

  toggleFollow = () => this.setState({ following: !this.state.following })

  toggleActionSheet = () => this.setState({ isOpen: !this.state.isOpen })

  render() {
    const { project } = this.props
    return (
      <Fragment>
        <AnimatedFlatList
          defaultPaddingTop
          withKeyboardHandler
          ListHeaderComponent={<Header name={project.name} followers={project.followers} />}
          data={project.posts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Post data={item} avatar={false} onPost onLongPress={this.toggleActionSheet} />
          )}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.scrollY } } }], {
            useNativeDriver: true,
          })}
          scrollRef={ref => {
            scrollView = ref
          }}
        />
        <Animated.View style={{ transform: [{ translateY: this.footerY }] }}>
          <Footer
            name={project.name}
            id={project.id}
            following={this.state.following}
            onFollowPress={this.toggleFollow}
          />
        </Animated.View>
        <ActionSheet
          isOpen={this.state.isOpen}
          onClose={this.toggleActionSheet}
          options={this.actionsheetOptions}
        />
      </Fragment>
    )
  }
}
