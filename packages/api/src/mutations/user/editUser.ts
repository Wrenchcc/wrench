import { UserInputError } from 'apollo-server-express'
import { DateTime } from 'luxon'
import { isAuthenticated } from '../../utils/permissions'
import { LOCALE_COLUMN, TIMEZONE_COLUMN } from '../../models/UserSettings'

export default isAuthenticated(async (_, args, ctx) => {
  if (args.input.interestedIn) {
    const interestedIn = args.input.interestedIn.map(({ id }) => ({
      projectTypeId: id,
      userId: ctx.userId,
    }))

    await ctx.db.UserInterestedIn.save(interestedIn)
  }

  if (args.input.locale) {
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

  await ctx.db.User.update(ctx.userId, {
    location: args.input.location || null,
    bio: args.input.bio || null,
    website: args.input.website || null,
    avatarUrl: args.input.avatarUrl || null,
    isSilhouette: !args.input.avatarUrl,
  })

  if (args.input.firstName) {
    await ctx.db.User.update(ctx.userId, {
      firstName: args.input.firstName,
    })
  }

  if (args.input.lastName) {
    await ctx.db.User.update(ctx.userId, {
      lastName: args.input.lastName,
    })
  }

  if (args.input.firstName || args.input.lastName) {
    await ctx.db.User.update(ctx.userId, {
      fullName: `${args.input.firstName} ${args.input.lastName}`,
    })
  }

  return ctx.loaders.user.load(ctx.userId)
})
