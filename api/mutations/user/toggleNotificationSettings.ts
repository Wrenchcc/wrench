import { mergeDeepRight } from 'ramda'
import user from '../../fixtures/generateUser'
import settings from '../../fixtures/settings'

export default (_, args, ctx) => {
  const { deliveryMethod, notificationType } = args.input

  const oldVal = settings.notifications.types[notificationType][deliveryMethod]
  const newSettings = mergeDeepRight(settings, {
    notifications: {
      types: {
        [notificationType]: {
          [deliveryMethod]: !oldVal,
        },
      },
    },
  })

  return {
    ...user(),
    settings: newSettings,
  }
}
