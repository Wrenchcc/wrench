import { UserInputError } from 'apollo-server-express'
import { requireAuth } from 'api/utils/permissions'
import { LOCALE_COLUMN } from 'api/models/UserSettings'
import { SUPPORTED_LOCALES } from 'shared/locale'

// TODO: Use dataloader
export default requireAuth(async (_, args, ctx) => {
  if (args.input.interestedIn) {
    const interestedIn = args.input.interestedIn.map(({ id }) => ({
      projectTypeId: id,
      userId: ctx.userId,
    }))

    await ctx.db.UserInterestedIn.save(interestedIn)
  }

  if (args.input.locale) {
    if (!SUPPORTED_LOCALES.includes(args.input.locale)) {
      return new UserInputError('Not a supported locale.')
    }

    const savedLocale = await ctx.db.UserSettings.findOne({
      where: {
        type: LOCALE_COLUMN,
        userId: ctx.userId,
      },
    })

    if (savedLocale) {
      await ctx.db.UserSettings.update(savedLocale.id, {
        value: args.input.locale,
      })
    } else {
      await ctx.db.UserSettings.save({
        type: LOCALE_COLUMN,
        userId: ctx.userId,
        value: args.input.locale,
      })
    }
  }

  return ctx.db.User.findOne(ctx.userId)
})
