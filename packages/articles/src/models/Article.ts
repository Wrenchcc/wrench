import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import ArticleAuthor from './ArticleAuthor'
import ArticleFile from './ArticleFile'
import ArticlePublisher from './ArticlePublisher'

@Entity('articles')
export default class Articles extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({ type: 'timestamptz' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date

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
}
