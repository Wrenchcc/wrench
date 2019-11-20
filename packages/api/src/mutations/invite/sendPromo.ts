import { UserInputError } from 'apollo-server-express'

const message = 'Tap: http://onelink.to/3trs2f to download Wrench.'

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
