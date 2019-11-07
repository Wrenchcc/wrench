import { UserInputError } from 'apollo-server-express'

const message =
  'Click here to download Wrench for iPhone: http://appstore.com/cc.wrench.app Android: https://play.google.com/store/apps/details?id=com.wrench'

export default async (_, { number }, ctx) => {
  if (!number) {
    return new UserInputError('Not a supported number.')
  }

  try {
    await ctx.services.sns.sendSMS(number, message)
  } catch (err) {
    return new UserInputError('Something went wrong.')
  }

  return true
}
