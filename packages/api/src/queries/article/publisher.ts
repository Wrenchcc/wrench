export default ({ publisherId }, _, ctx) => ctx.db.ArticlePublisher.findOne(publisherId)
