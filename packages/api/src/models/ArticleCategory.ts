import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm'
import slugify from '../utils/slugify'

@Entity('article_categories')
export default class ArticleCategory extends BaseEntity {
  public static async findOrCreate(categories) {
    return Promise.all(
      categories.map(async name => {
        const slug = slugify(name)
        const category = await ArticleCategory.findOne({ slug })

        if (category) {
          return category
        }

        // @ts-ignore
        return ArticleCategory.save({
          name,
          slug,
        })
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

  @Column({ unique: true })
  public slug: string
}
