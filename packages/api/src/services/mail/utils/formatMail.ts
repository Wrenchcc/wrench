import { MAIL_TYPES } from '../../../utils/enums'

export default function formatMail(type, user) {
  switch (type) {
    case MAIL_TYPES.WELCOME:
      return {
        template: 'welcome',
        message: {
          to: user.email,
        },
        locals: {
          firstName: user.firstName,
        },
      }

    default:
      return null
  }
}
