import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm'
import ArticlePublisher from './ArticlePublisher'
import User from './User'

@Entity('article_publishers_seen')
export default class ArticlePublisherSeen extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date

  @ManyToOne(() => ArticlePublisher, publisher => publisher)
  public publisher: ArticlePublisher

  @ManyToOne(() => User, user => user)
  public user: User

  @Column()
  public publisherId: string

  @Column()
  public userId: string

  @CreateDateColumn({ type: 'timestamptz' })
  public lastSeen: Date
}
