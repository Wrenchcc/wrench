import { NOTIFICATION_TYPES } from '../../../utils/enums'
import { translate } from '../../../i18n'

export default function formatNotification(type, data, user, locale) {
  switch (type) {
    case NOTIFICATION_TYPES.NEW_FOLLOWER:
      return {
        body: translate({
          key: NOTIFICATION_TYPES.NEW_FOLLOWER,
          locale,
          params: {
            name: user.fullName,
            project: data.title,
          },
        }),
      }
    case NOTIFICATION_TYPES.NEW_COMMENT:
      return {
        body: translate({
          key: NOTIFICATION_TYPES.NEW_COMMENT,
          locale,
          params: {
            comment: data.text,
            name: user.fullName,
          },
        }),
      }
    case NOTIFICATION_TYPES.COMMENT_UPDATES:
      return {
        body: translate({
          key: NOTIFICATION_TYPES.COMMENT_UPDATES,
          locale,
          params: {
            comment: data.text,
            name: user.fullName,
          },
        }),
      }
    case NOTIFICATION_TYPES.NEW_MENTION:
      return {
        body: translate({
          key: NOTIFICATION_TYPES.NEW_MENTION,
          locale,
          params: {
            comment: data.text,
            name: user.fullName,
          },
        }),
      }
    case NOTIFICATION_TYPES.NEW_POST_LIKE:
      return {
        body: translate({
          key: NOTIFICATION_TYPES.NEW_POST_LIKE,
          locale,
          params: {
            name: user.fullName,
          },
        }),
      }
    case NOTIFICATION_TYPES.NEW_COMMENT_LIKE:
      return {
        body: translate({
          key: NOTIFICATION_TYPES.NEW_COMMENT_LIKE,
          locale,
          params: {
            name: user.fullName,
          },
        }),
      }
    case NOTIFICATION_TYPES.NEW_REPLY:
      return {
        body: translate({
          key: NOTIFICATION_TYPES.NEW_REPLY,
          locale,
          params: {
            comment: data.text,
            name: user.fullName,
          },
        }),
      }

    // case NOTIFICATION_TYPES.PROJECT_UPDATES:
    //   return {
    //     body: translate({
    //       key: NOTIFICATION_TYPES.PROJECT_UPDATES,
    //       locale,
    //       params: {
    //         comment: data.text,
    //         name: user.fullName,
    //       },
    //     }),
    //   }
    default:
      return null
  }
}
