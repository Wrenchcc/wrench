import { MAIL_TYPES } from '../../../utils/enums'

const DEFAULT_SOURCE = 'Wrench <no-reply@wrench.cc>'

export default function formatMail(type, user) {
  switch (type) {
    case MAIL_TYPES.WELCOME:
      return {
        Source: DEFAULT_SOURCE,
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
