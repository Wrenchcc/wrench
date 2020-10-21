export default async ({ id }, _, ctx) => {
  const postCollection = await ctx.db.PostCollection.findOne({ postId: id })

  if (postCollection?.collectionId) {
    const collection = await ctx.db.Collection.findOne(postCollection.collectionId)

    return collection
  }

  return null
}
