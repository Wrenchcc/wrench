import { mergeAll } from 'ramda'
import notificationsTypes from './notificationsTypes'

export default updatedNotificationsTypes => ({
  ...notificationsTypes,
  ...mergeAll(updatedNotificationsTypes.map(({ type, value }) => ({ [type]: value }))),
})
