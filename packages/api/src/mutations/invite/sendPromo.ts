export default async (_, { number }, ctx) => {
  if (!number) {
    return null
  }

  await ctx.services.sms.send(number)
  return true
}
