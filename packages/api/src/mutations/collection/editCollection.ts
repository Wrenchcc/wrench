import { ForbiddenError } from 'apollo-server-express'
import { isAuthenticated, canModerateCollection, isAdmin } from '../../utils/permissions'
import { transformFileUrl } from '../../utils/transformFileUrl'

export default isAuthenticated(async (_, { id, input }, ctx) => {
  const collection = await ctx.db.Collection.findOne(id)

  if (!canModerateCollection(collection, ctx.userId) && !isAdmin(ctx.userId)) {
    return new ForbiddenError('You don’t have permission to manage this collection.')
  }

  const postCollection = await ctx.db.PostCollection.findOne({ collectionId: collection.id })
  const file = await ctx.db.File.findOne({ postId: postCollection.postId })

  return ctx.db.Collection.editCollection({
    ...collection,
    ...input,
    cover: {
      uri: file && transformFileUrl(file.filename),
    },
  })
})
