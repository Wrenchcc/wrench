import { UserInputError } from 'apollo-server-express'

export default async (_, { number }, ctx) => {
  if (!number) {
    return new UserInputError('Not a supported number.')
  }

  try {
    await ctx.services.sms.send(number)
  } catch (err) {
    return new UserInputError('Something went wrong.')
  }

  return true
}
