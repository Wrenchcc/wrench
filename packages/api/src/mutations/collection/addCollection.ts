import { isAuthenticated } from '../../utils/permissions'

export default isAuthenticated(async (_, { projectId, name }, ctx) => {
  const collection = await ctx.db.Collection.findOrCreate(name.trim())

  await ctx.db.ProjectCollection.save({
    collectionId: collection.id,
    projectId,
  })

  return collection
})
