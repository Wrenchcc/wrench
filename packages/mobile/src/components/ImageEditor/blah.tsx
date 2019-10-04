import React, { PureComponent } from 'react'
import { View, Dimensions, Image, PanResponder } from 'react-native'

const window = Dimensions.get('window')
const WW = window.width

export default class ImageEdit extends PureComponent {
  public static defaultProps = {
    image: '',
    width: WW,
    height: WW,
    editing: false,
    showSaveButtons: true,
    showGrids: true,
  }

  public static changed(props, state) {
    const image = props.image

    return (
      props.width != state.width || props.height != state.height || state.image.uri != image.uri
    )
  }

  public static getDerivedStateFromProps(props, state) {
    const changed = ImageEdit.changed(props, state) && !state.nextProps

    if (changed) {
      return {
        nextProps: props,
      }
    }

    return null
  }

  constructor(props) {
    super(props)

    this.state = {
      width: this.props.width,
      height: this.props.height,
      image: {
        uri: null,
        width: 0,
        height: 0,
        x: 0,
        y: 0,
      },
      editing: this.props.editing,
      isPinching: false,
      isMoving: false,
      nextProps: false,
    }

    this.initW = 0
    this.initH = 0
    this.initX = 0
    this.initY = 0
    this.info = {}
    this.initDistance = 0

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: this.onMove,
      onPanResponderRelease: this.onRelease,
      onPanResponderTerminate: this.onRelease,
      onPanResponderTerminationRequest: () => true,
      onShouldBlockNativeResponder: () => true,
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
    })
  }

  public componentDidUpdate() {
    this._build()
  }

  public _build() {
    if (!this.state.nextProps || !ImageEdit.changed(this.state.nextProps, this.state)) {
      return null
    }
    const props = this.state.nextProps
    const w = props.width || WW
    const h = props.height || WW
    const image = props.image
    let iw = image.width || 0
    let ih = image.height || 0

    const info = {
      nextProps: false,
      width: w,
      height: h,
    }

    if (image.uri != this.state.image.uri) {
      this.getImageSize(image).then(
        dim => {
          const width = dim.width || 0,
            height = dim.height || 0

          // Scale image size to the area
          let new_iw = w
          let new_ih = (new_iw * height) / width
          if (new_ih < h) {
            new_ih = h
            new_iw = (new_ih * width) / height
          }
          iw = new_iw
          ih = new_ih

          info.image = {
            x: 0,
            y: 0,
            ...image,
            width: iw,
            height: ih,
          }
          this.setState(info)
        },
        () => {
          info.image = {
            x: 0,
            y: 0,
            ...image,
            width: w,
            height: h,
          }
          this.setState(info)
        }
      )
    } else {
      this.setState(info)
    }
  }

  public getImageSize(image) {
    const uri = image.uri

    return new Promise((resolve, reject) => {
      if (image.width && image.height) {
        resolve({ width: image.width, height: image.height })
      } else if (uri) {
        if (/^http/i.test(uri) || /^file:/.test(uri)) {
          Image.getSize(
            uri,
            (w, h) => {
              resolve({ width: w, height: h })
            },
            reject
          )
        } else {
          const info = resolveAssetSource({ uri })
          if (info.width && info.height) {
            resolve(info)
          } else {
            reject()
          }
        }
      } else {
        reject()
      }
    })
  }

  public onRelease = () => {
    this.setState({
      isPinching: false,
      isMoving: false,
    })

    this.distance = 0
  }

  public onMove = (evt, gestureState) => {
    evt.persist()

    if (!this.state.editing) {
      return
    }

    // Pinching
    if (evt.nativeEvent.touches.length == 2) {
      const x1 = evt.nativeEvent.touches[0].locationX
      const y1 = evt.nativeEvent.touches[0].locationY
      const x2 = evt.nativeEvent.touches[1].locationX
      const y2 = evt.nativeEvent.touches[1].locationY
      const a = x1 - x2
      const b = y1 - y2
      const dist = Math.sqrt(a * a + b * b)

      const info = {}

      if (this.state.isPinching) {
        this.distance = dist - this.initDistance
        info.image = {
          ...this.state.image,
          width: this.initW + this.distance,
          height: this.initH + this.distance,
        }

        if (!this.state.cropIn) {
          // Keep the image size >= to crop area
          let new_iw = info.image.width,
            new_ih = info.image.height
          if (this.state.width > info.image.width) {
            new_iw = this.state.width
            new_ih = (new_iw * this.initH) / this.initW
          }

          if (this.state.height > new_ih) {
            new_ih = this.state.height
            new_iw = (new_ih * this.initW) / this.initH
          }

          info.image.width = new_iw
          info.image.height = new_ih

          // position
          let x = this.state.image.x
          let y = this.state.image.y
          const maxx = -1 * Math.abs(info.image.width - this.state.width),
            maxy = -1 * Math.abs(info.image.width - this.state.height)

          if (x < maxx) {
            x = maxx
          }
          if (x > 0) {
            x = 0
          }
          if (y < maxy) {
            y = maxy
          }
          if (y > 0) {
            y = 0
          }
          info.image.x = x
          info.image.y = y
        }
      } else {
        this.initW = this.state.image.width
        this.initH = this.state.image.height
        this.initDistance = dist
        info.isPinching = true
      }

      // this.props.onChange({
      // originX, originY, width, height
      //   width: info.image.width,
      //   height: info.image.height,
      //   x: info.image.x,
      //   y: info.image.y,
      // })

      this.setState(info)
    } else if (evt.nativeEvent.touches.length == 1) {
      // Moving
      if (this.state.isMoving) {
        let x = this.initX + gestureState.dx,
          y = this.initY + gestureState.dy

        const maxx = -1 * Math.abs(this.state.image.width - this.state.width),
          maxy = -1 * Math.abs(this.state.image.height - this.state.height)

        if (x < maxx) {
          x = maxx
        }
        if (x > 0) {
          x = 0
        }
        if (y < maxy) {
          y = maxy
        }
        if (y > 0) {
          y = 0
        }

        this.props.onChange({
          originX: x,
          originY: y,
          width: this.state.image.width,
          height: this.state.image.height,
        })

        this.setState({
          image: {
            ...this.state.image,
            x,
            y,
          },
        })
      } else {
        this.initX = this.state.image.x
        this.initY = this.state.image.y
        this.setState({ isMoving: true })
      }
    }
  }

  // Render Image
  public renderImage() {
    if (this.state.image.uri) {
      return (
        <Image
          style={{
            width: this.state.image.width,
            height: this.state.image.height,
            top: this.state.image.y,
            left: this.state.image.x,
          }}
          source={this.state.image}
        />
      )
    }
  }

  public render() {
    return (
      <View
        {...this.panResponder.panHandlers}
        style={{
          overflow: 'hidden',
          width: this.state.width,
          height: this.state.height,
        }}
      >
        {this.renderImage()}
      </View>
    )
  }
}
