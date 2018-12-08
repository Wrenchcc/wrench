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

@Entity('comments')
export default class Comment extends BaseEntity {
  @ManyToOne(() => User, user => user.comments)
  public user: User

  @ManyToOne(() => Post, post => post.comments, { onDelete: 'CASCADE' })
  public post: Post

  @PrimaryGeneratedColumn('uuid')
  private id: string

  @Column({ nullable: true })
  private postId: string

  @Column()
  private userId: string

  @Column({ nullable: true })
  private commentId: string

  @CreateDateColumn()
  private createdAt: Date

  @UpdateDateColumn()
  private updatedAt: Date

  @Column('text')
  private text: string
}
