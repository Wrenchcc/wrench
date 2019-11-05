import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('article_author')
export default class ArticleAuthor extends BaseEntity {
  public static async findOrCreate(where, save) {
    const author = await ArticleAuthor.findOne({ where })

    if (author) {
      return author
    }

    return ArticleAuthor.save(save)
  }

  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column()
  public fullName: string
}
