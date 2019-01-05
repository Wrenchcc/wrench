import { UserInputError } from 'apollo-server-express'
import { DateTime } from 'luxon'
import { requireAuth } from 'api/utils/permissions'
import { LOCALE_COLUMN, TIMEZONE_COLUMN } from 'api/models/UserSettings'
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

  if (args.input.timezone) {
    if (!DateTime.local().setZone(args.input.timezone).isValid) {
      return new UserInputError('Not a supported timezone.')
    }

    const savedTimezone = await ctx.db.UserSettings.findOne({
      where: {
        type: TIMEZONE_COLUMN,
        userId: ctx.userId,
      },
    })

    if (savedTimezone) {
      await ctx.db.UserSettings.update(savedTimezone.id, {
        value: args.input.timezone,
      })
    } else {
      await ctx.db.UserSettings.save({
        type: TIMEZONE_COLUMN,
        userId: ctx.userId,
        value: args.input.timezone,
      })
    }
  }

  return ctx.db.User.findOne(ctx.userId)
})
