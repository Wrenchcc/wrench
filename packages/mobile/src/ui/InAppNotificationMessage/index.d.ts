export interface InAppNotificationMessageProps {
  visible: boolean
  onPress: () => void
  title: string
  body: string
  data: object
  onFadeOutAnimationEnd: () => void
}

declare const InAppNotificationMessage: React.FunctionComponent<InAppNotificationMessageProps>

export default InAppNotificationMessage
