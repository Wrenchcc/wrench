import React from 'react'
import { View } from 'react-native'
import { InAppNotificationMessageProps } from './index'
import AnimationWrapper from './Animation'
import MessageLayout from './MessageLayout'

export interface AnimatedView extends View {
  animate: (animationName: string, duration: number) => Promise<null>
}

const InAppNotificationMessage: React.FunctionComponent<InAppNotificationMessageProps> = ({
  visible,
  onPress,
  body,
  title,
  avatarUrl,
  onFadeOutAnimationEnd,
}: InAppNotificationMessageProps) => null
// (
//   <AnimationWrapper onFadeOut={onFadeOutAnimationEnd} visible={visible} onPress={onPress}>
//     <MessageLayout body={body} title={title} avatarUrl={avatarUrl} />
//   </AnimationWrapper>
// )

export default InAppNotificationMessage
