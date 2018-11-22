import { mergeAll } from 'ramda'

export function isThruthy(val) {
  return (val === 'true' && true) || false
}

export function toggleValue(val) {
  return val === 'true' ? 'false' : 'true'
}

export function transformNotificationTypes(notifications) {
  return mergeAll(
    notifications.map(({ type, value }) => ({
      [type]: {
        push: isThruthy(value),
      },
    }))
  )
}
