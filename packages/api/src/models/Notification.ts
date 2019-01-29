import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  getRepository,
} from 'typeorm'
import User from './User'
import { NotificationTypes } from './enums'

@Entity('notifications')
export default class Notification extends BaseEntity {
  public static async unreadCount(userId) {
    return getRepository(Notification)
      .createQueryBuilder('notification')
      .select('COUNT(notification.id)', 'unreadCount')
      .where('notification.isSeen = :isSeen AND notification.userId = :userId', {
        isSeen: false,
        userId,
      })
      .getRawOne()
  }

  @ManyToOne(() => User, user => user.notifications)
  public user: User

  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column('uuid')
  public to: string

  @Column()
  public userId: string

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date

  @Column('enum', { enum: NotificationTypes })
  public type: NotificationTypes

  @Column('uuid')
  public typeId: string

  @Column({ default: false })
  public isSeen: boolean
}
