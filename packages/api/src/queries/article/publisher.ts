export default ({ publisherId }, _, ctx) => {
  return ctx.db.ArticlePublisher.findOne(publisherId)
}
