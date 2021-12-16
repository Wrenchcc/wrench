import React from 'react'
import { Navigation } from 'react-native-navigation'
import Animation from './Animation'
import { NAVIGATION_BANNER } from './constants'

type BannerProps = {
  component: any
  options: BannerOptions
}

type BannerOptions = {
  children?: any
  dismissAfter?: number
  gestureEnabled?: boolean
  onPress?: (props: any) => any
  onSlideIn?: (props: any) => any
  onSlideOut?: (props: any) => any
  persist?: boolean
  props?: any
}

export default class NavigationBanner {
  static queue = []
  static visible = false

  private static setQueue(queue: any): void {
    this.queue = queue
  }

  private static setVisible(payload: boolean): void {
    this.visible = payload
  }

  private static async showBanner(options: any): Promise<void> {
    try {
      this.setVisible(true)

      await Navigation.showOverlay({
        component: {
          name: NAVIGATION_BANNER,
          passProps: options,
          options: {
            overlay: {
              interceptTouchOutside: false,
            },
            layout: {
              componentBackgroundColor: 'transparent',
            },
          },
        },
      })
    } catch (err) {
      console.log(err)
    }
  }

  public static async show(banner: BannerProps): Promise<void> {
    try {
      this.setQueue([...this.queue, banner])
      const [currentBanner, ...otherBanners] = this.queue

      if (!this.visible) {
        await this.showBanner(currentBanner)
        // NOTE: Add next banner to queue
        this.setQueue(otherBanners)
      }
    } catch (err) {
      console.log(err)
    }
  }

  public static dismiss() {
    if (this.animationRef) {
      this.animationRef.onDismiss()
    }
  }

  private static async internalDismiss(): Promise<void> {
    try {
      await Navigation.dismissAllOverlays()

      this.setVisible(false)

      const [currentBanner, ...otherBanners] = this.queue

      if (currentBanner) {
        this.showBanner(currentBanner)
        this.setQueue(otherBanners)
      }
    } catch (err) {
      console.log(err)
    }
  }

  // NOTE: We need to register a component, we will pass the
  // Content thru passProps from RNN as a child
  private static BannerWrapper: React.FC<BannerProps> = ({ component, ...options }) => {
    // NOTE: props is component specific props
    const {
      onPress,
      gestureEnabled = false,
      dismissAfter = 0,
      onSlideIn,
      onSlideOut,
      props,
    }: BannerOptions = options

    const handleOnPress = () => {
      if (onPress) {
        onPress(props)
      }
    }

    const handleOnSlideOut = () => {
      this.internalDismiss()

      if (onSlideOut) {
        onSlideOut(props)
      }
    }

    const handleOnSlideIn = () => {
      if (onSlideIn) {
        onSlideIn(props)
      }
    }

    const Component = component

    if (!Component) {
      return null
    }

    return (
      <Animation
        ref={(ref) => (this.animationRef = ref)}
        onSlideOut={handleOnSlideOut}
        onSlideIn={handleOnSlideIn}
        onPress={onPress && handleOnPress}
        gestureEnabled={gestureEnabled}
        dismissAfter={dismissAfter}
      >
        <Component {...props} />
      </Animation>
    )
  }

  public static register(fn: any): void {
    Navigation.registerComponent(NAVIGATION_BANNER, () => fn(this.BannerWrapper))
  }
}
