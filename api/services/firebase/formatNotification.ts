import { translate } from 'api/i18n'
import { NOTIFICATION_TYPES } from 'shared/utils/enums'

export default function formatNotification(type, data, user, locale) {
  switch (type) {
    case NOTIFICATION_TYPES.NEW_FOLLOWER:
      return {
        notification: {
          body: translate({
            key: NOTIFICATION_TYPES.NEW_FOLLOWER,
            locale,
            params: {
              name: user.fullName,
              project: data.title,
            },
          }),
        },
      }
    case NOTIFICATION_TYPES.NEW_COMMENT:
      return {
        notification: {
          body: translate({
            key: NOTIFICATION_TYPES.NEW_COMMENT,
            locale,
            params: {
              comment: data.text,
              name: user.fullName,
              project: data.title,
            },
          }),
        },
      }
    case NOTIFICATION_TYPES.NEW_MENTION:
      return {
        notification: {
          body: translate({
            key: NOTIFICATION_TYPES.NEW_MENTION,
            locale,
            params: {
              comment: data.text,
              name: user.fullName,
            },
          }),
        },
      }
    case NOTIFICATION_TYPES.NEW_REPLY:
      return {
        notification: {
          body: translate({
            key: NOTIFICATION_TYPES.NEW_REPLY,
            locale,
            params: {
              comment: data.text,
              name: user.fullName,
            },
          }),
        },
      }
    default:
      return null
  }
}
