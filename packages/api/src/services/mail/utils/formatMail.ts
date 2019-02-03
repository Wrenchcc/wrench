import { MAIL_TYPES } from '../../../utils/enums'

export default function formatMail(type, user) {
  switch (type) {
    case MAIL_TYPES.WELCOME:
      return {
        Source: 'Wrench <no-reply@wrench.cc>',
        Template: MAIL_TYPES.WELCOME,
        Destination: {
          ToAddresses: [user.email],
        },
        TemplateData: JSON.stringify({
          firstName: user.firstName,
        }),
      }
    default:
      return null
  }
}
