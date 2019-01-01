import * as i18n from 'i18n'
import { NOTIFICATION_TYPES } from 'shared/utils/enums'

i18n.configure({
  defaultLocale: 'en',
  directory: `${__dirname}/i18n`,
  locales: ['en', 'sv'],
})

// TODO: Fix dynamicLink and locale
export default function formatNotification(type, data, user, translate) {
  switch (type) {
    case NOTIFICATION_TYPES.NEW_FOLLOWER:
      return {
        body: `${user.fullName} started following your project: ${data.title}.`,
      }
    case NOTIFICATION_TYPES.NEW_COMMENT:
      return {
        body: i18n.__(NOTIFICATION_TYPES.NEW_COMMENT, {
          comment: data.text,
          name: user.fullName,
          project: data.title,
        }),
      }
    case NOTIFICATION_TYPES.NEW_MENTION:
      return {
        body: `${user.fullName} mentioned you in a comment: "${data.text}".`,
      }
    case NOTIFICATION_TYPES.NEW_REPLY:
      return {
        body: `${user.fullName} replied to your comment: "${data.text}".`,
      }
    default:
      return null
  }
}
