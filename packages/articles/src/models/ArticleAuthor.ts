import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('article_author')
export default class ArticleAuthor extends BaseEntity {
  public static async findOrCreate(fullName) {
    const author = await ArticleAuthor.findOne({ fullName })

    if (author) {
      return author
    }

    return ArticleAuthor.save({
      fullName,
    })
  }

  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column()
  public fullName: string
}
