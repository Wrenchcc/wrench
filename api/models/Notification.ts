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
import Comment from './Comment'

enum NotificationType {
  Comment = 'comment',
  Follow = 'follow',
  Reply = 'reply',
}

@Entity('notifications')
export default class Notification extends BaseEntity {
  @ManyToOne(() => User, user => user.notifications)
  public user: User

  // @ManyToOne(() => Comment, comment => comment.notification)
  // public comment: Comment

  // project
  // comment

  @PrimaryGeneratedColumn('uuid')
  private id: string

  @CreateDateColumn()
  private createdAt: Date

  @UpdateDateColumn()
  private updatedAt: Date

  @Column('enum', { enum: NotificationType })
  private type: NotificationType

  @Column({ default: false })
  private isSeen: boolean
}
