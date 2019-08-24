import { NOTIFICATION_TYPES } from './enums'

const defaultValue = {
  push: true,
  email: true,
}

export const DEFAULT_NOTIFICATIONS = {
  [NOTIFICATION_TYPES.NEW_ARTICLE]: defaultValue,
  [NOTIFICATION_TYPES.NEW_COMMENT]: defaultValue,
  [NOTIFICATION_TYPES.NEW_FOLLOWER]: defaultValue,
  [NOTIFICATION_TYPES.NEW_MENTION]: defaultValue,
  [NOTIFICATION_TYPES.PRODUCT_ANNOUNCEMENTS]: defaultValue,
  [NOTIFICATION_TYPES.SIMILAR_PROJECTS]: defaultValue,
}

export const DELIVERY_METHODS = ['push', 'email']
