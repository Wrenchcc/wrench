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

@Entity('article_files')
export default class ArticleFile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date

  @Column({ unique: true })
  public filename: string

  @ManyToOne(() => Article, article => article.files)
  public article: Article

  @Column({ nullable: true })
  public articleId: string
}
