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
  // user
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
