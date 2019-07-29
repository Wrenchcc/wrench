import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm'
import slugify from '../utils/slugify'

@Entity('article_categories')
export default class ArticleCategory extends BaseEntity {
  public static async findOrCreate(categories) {
    let times = 0

    return Promise.all(
      categories.map(async name => {
        const category = await ArticleCategory.findOne({ name })

        if (category) {
          return category
        }

        while (times < 100) {
          try {
            return ArticleCategory.save({
              name,
              slug: times ? slugify(`${name}-${times}`) : slugify(name),
            })
            break
          } catch (err) {
            if (!err.detail.includes('already exists')) {
              throw err
            }
          }

          times += 1
        }
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
