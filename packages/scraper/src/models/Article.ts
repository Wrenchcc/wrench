import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import ArticleAuthor from './ArticleAuthor'
import ArticleCategory from './ArticleCategory'
import ArticleFile from './ArticleFile'
import ArticlePublisher from './ArticlePublisher'

@Entity('articles')
export default class Articles extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date

  @Column()
  public publishedAt: Date

  @Column('text')
  public description: string

  @Column()
  public url: string

  @Column()
  public title: string

  @ManyToOne(() => ArticleAuthor, author => author)
  public author: ArticleAuthor

  @ManyToOne(() => ArticlePublisher, publisher => publisher)
  public publisher: ArticlePublisher

  @OneToMany(() => ArticleFile, file => file.article)
  public files: ArticleFile[]

  @OneToMany(() => ArticleCategory, category => category.article)
  public categories: ArticleCategory[]
}
