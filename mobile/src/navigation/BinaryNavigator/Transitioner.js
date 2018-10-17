import React, { Component } from 'react'
import { Animated, Dimensions, Easing, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import withCachedChildNavigation from 'react-navigation/src/withCachedChildNavigation'
import { Colors } from 'ui/constants'

const DEVICE_HEIGHT = Dimensions.get('window').height

class Transitioner extends Component {
  static propTypes = {
    router: PropTypes.shape({
      getComponentForRouteName: PropTypes.func,
    }),
    navigation: PropTypes.object,
    screenProps: PropTypes.object,
    childNavigationProps: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.state = {
      firstProgress: new Animated.Value(this.props.navigation.state.index),
      secondProgress: new Animated.Value(this.props.navigation.state.index),
      transitioning: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.navigation.state.index !== this.props.navigation.state.index) {
      this.transitionToIndex(nextProps.navigation.state.index)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.transitioning !== this.state.transitioning
      || nextProps.navigation.state !== this.props.navigation.state
    )
  }

  transitionToIndex(index) {
    this.setState(
      state => ({
        transitioning: true,
      }),
      () => {
        Animated.parallel([
          Animated.timing(this.state.firstProgress, {
            duration: 350,
            easing: Easing.in(Easing.ease),
            toValue: index,
            useNativeDriver: true,
          }),
          Animated.timing(this.state.secondProgress, {
            duration: 300,
            easing: Easing.out(Easing.ease),
            toValue: index,
            useNativeDriver: true,
          }),
        ]).start(endState => {
          if (endState.finished) {
            this.setState({
              transitioning: false,
            })
          }
        })
      }
    )
  }

  renderScene({ routeName }) {
    const SceneComponent = this.props.router.getComponentForRouteName(routeName)
    const navigation = this.props.childNavigationProps[routeName]
    return <SceneComponent navigation={navigation} screenProps={this.props.screenProps} />
  }

  render() {
    const { transitioning } = this.state
    const [firstRoute, secondRoute] = this.props.navigation.state.routes
    const isFirstActive = this.props.navigation.state.index === 0
    const isSecondActive = this.props.navigation.state.index === 1

    return (
      <>
        {(isSecondActive || transitioning) && (
          <Animated.View
            pointerEvents={transitioning ? 'none' : 'box-none'}
            style={{
              flex: 1,
              transform: transitioning
                ? [
                  {
                    scale: this.state.secondProgress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.95, 1],
                    }),
                  },
                ]
                : [],
            }}
          >
            {this.renderScene(secondRoute)}
          </Animated.View>
        )}
        {(isFirstActive || transitioning) && (
          <Animated.View
            pointerEvents={transitioning ? 'none' : 'box-none'}
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'white',
              borderTopWidth: 1,
              borderColor: Colors.DIVIDER,
              top: -1,
              transform: [
                {
                  translateY: this.state.firstProgress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, DEVICE_HEIGHT],
                  }),
                },
              ],
            }}
          >
            {this.renderScene(firstRoute)}
          </Animated.View>
        )}
      </>
    )
  }
}

export default withCachedChildNavigation(Transitioner)
