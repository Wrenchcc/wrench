import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm'

@Entity('article_categories')
export default class ArticleCategory extends BaseEntity {
  public static async findOrCreate(categories) {
    return Promise.all(
      categories.map(async name => {
        const category = await ArticleCategory.findOne({ name })

        if (category) {
          return category
        }

        // return ArticleCategory.save({
        //   name,
        // })
      })
    )
  }

  @PrimaryGeneratedColumn('uuid')
  public id: string

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date

  @Column({ unique: true })
  public name: string

  // @Column({ unique: true })
  // public slug: string
}
