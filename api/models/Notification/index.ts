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
import Comment from '../Comment'
import { NotificationTypes } from '../enums'

@Entity('notifications')
export default class Notification extends BaseEntity {
  @ManyToOne(() => User, user => user.notifications)
  public user: User

  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column('uuid')
  public to: string

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @Column('enum', { enum: NotificationTypes })
  public type: NotificationTypes

  @Column('uuid')
  public typeId: string

  @Column({ default: false })
  public isSeen: boolean
}
