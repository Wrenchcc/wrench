import React, { Fragment, PureComponent } from 'react'
import { View, Animated, Easing } from 'react-native'

const generateStyles = ({ size, width, color, backgroundColor }) => ({
  container: {
    bottom: 0,
    width: size,
    height: size,
  },
  background: {
    width: size,
    height: size,
    borderRadius: size / 2,
    borderWidth: width,
    borderColor: backgroundColor,
    position: 'absolute',
  },
  cutOff: {
    width: size,
    height: size,
    borderWidth: width,
    borderColor: backgroundColor,
    borderRadius: size / 2,
  },
  secondHalfContainer: {
    position: 'absolute',
  },
  halfCircle: {
    width: size,
    height: size / 2,
    overflow: 'hidden',
    position: 'absolute',
  },
  circleArc: {
    width: size,
    height: size,
    borderColor: color,
    borderRadius: size / 2,
    borderWidth: width,
  },
})

class Spinner extends PureComponent {
  public state = {
    animatedVal: new Animated.Value(0),
  }

  public componentDidMount() {
    const { animateFromValue, progress } = this.props
    const { animatedVal } = this.state

    if (animateFromValue >= 0) {
      animatedVal.setValue(animateFromValue)
      this.animateTo(progress)
    } else {
      animatedVal.setValue(progress)
    }
  }

  public componentDidUpdate(prevProps) {
    if (prevProps.progress !== this.props.progress) {
      this.state.animatedVal.setValue(this.props.progress)
    }
  }

  public interpolateAnimVal = (inputRange, outputRange) =>
    this.state.animatedVal.interpolate({
      inputRange,
      outputRange,
      extrapolate: 'clamp',
    })

  public interpolateRotation = isSecondHalf =>
    this.interpolateAnimVal(isSecondHalf ? [50, 100] : [0, 50], ['0deg', '180deg'])

  public interpolateRotationTwoOpacity = () => this.interpolateAnimVal([50, 50.01], [0, 1])

  public interpolateColorOpacity = () => this.interpolateAnimVal([0, 100], [0, 1])

  public animateTo = toValue => {
    Animated.timing(this.state.animatedVal, {
      toValue,
      duration: 1000,
      easing: Easing.easeInOut,
      useNativeDriver: true,
    }).start()
  }

  public resetAnimation = (progress = this.props.progress) =>
    this.state.animatedVal.setValue(progress)

  public circleHalf = (styles, isSecondHalf, color) => (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.container,
        {
          opacity: isSecondHalf ? this.interpolateRotationTwoOpacity() : 1,
          transform: [{ rotate: this.interpolateRotation(isSecondHalf) }],
        },
      ]}
    >
      <View
        style={[
          styles.halfCircle,
          isSecondHalf && {
            bottom: 0,
            transform: [{ rotate: '180deg' }],
          },
        ]}
      >
        <View style={[styles.circleArc, { borderColor: color }]} />
      </View>
    </Animated.View>
  )

  public renderLoader = (styles, color = this.props.color) => (
    <Fragment>
      <View style={styles.background} />
      {this.circleHalf(styles, false, color)}
      <View style={styles.halfCircle}>
        <View style={styles.cutOff} />
      </View>
      <View style={styles.secondHalfContainer}>{this.circleHalf(styles, true, color)}</View>
    </Fragment>
  )

  public render() {
    const styles = generateStyles(this.props)
    const { fullColor } = this.props

    return (
      <View style={styles.container}>
        {this.renderLoader(styles)}
        {fullColor && (
          <Animated.View style={{ position: 'absolute', opacity: this.interpolateColorOpacity() }}>
            {this.renderLoader(styles, fullColor)}
          </Animated.View>
        )}
      </View>
    )
  }
}

export default Spinner
