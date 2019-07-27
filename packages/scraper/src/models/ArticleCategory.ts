import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm'
import Article from './Article'

@Entity('article_categories')
export default class ArticleCategory extends BaseEntity {
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

  @ManyToOne(() => Article, article => article.categories)
  public article: Article
}
