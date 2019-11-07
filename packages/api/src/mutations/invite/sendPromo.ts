import { UserInputError } from 'apollo-server-express'
import { sendSMS } from '../../services/sns'

const message =
  'Click here to download Wrench for iPhone: http://appstore.com/cc.wrench.app Android: https://play.google.com/store/apps/details?id=com.wrench'

export default async (_, { number }) => {
  if (!number) {
    return new UserInputError('Not a supported number.')
  }

  try {
    await sendSMS(number, message)
  } catch (err) {
    return new UserInputError('Something went wrong.')
  }

  return true
}
