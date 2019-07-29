export default ({ authorId }, _, ctx) => ctx.db.ArticleAuthor.findOne(authorId)
