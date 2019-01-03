import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import User from '../User'
import Post from '../Post'

@Entity('comments')
export default class Comment extends BaseEntity {
  @ManyToOne(() => User, user => user.comments)
  public user: User

  @ManyToOne(() => Post, post => post.comments, { onDelete: 'CASCADE' })
  public post: Post

  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({ nullable: true })
  public postId: string

  @Column()
  public userId: string

  @Column({ nullable: true })
  public commentId: string

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date

  @Column('text')
  public text: string
}
