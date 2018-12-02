import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import User from './User'
import Post from './Post'
import Notification from './Notification'

@Entity('comments')
export default class Comment extends BaseEntity {
  @ManyToOne(() => User, user => user.comments)
  public user: User

  @ManyToOne(() => Notification, notification => notification.comment)
  public notification: Notification

  @ManyToOne(() => Post, post => post.comments)
  public post: Post

  @PrimaryGeneratedColumn('uuid')
  private id: string

  @Column({ nullable: true })
  private postId: number

  @CreateDateColumn()
  private createdAt: Date

  @UpdateDateColumn()
  private updatedAt: Date

  @Column('text')
  private text: string
}
