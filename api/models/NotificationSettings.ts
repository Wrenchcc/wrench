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

@Entity('notifications_settings')
export default class NotificationSettings extends BaseEntity {
  public static async findOrCreate(where, save) {
    const settingsRepo = NotificationSettings.getRepository()
    const settings = await settingsRepo.findOne({ where })

    if (settings) {
      return settings
    }

    return settingsRepo.save(save)
  }

  @ManyToOne(type => User, user => user.notificationSettings)
  public user: User

  @PrimaryGeneratedColumn()
  private id: number

  @CreateDateColumn()
  private createdAt: Date

  @UpdateDateColumn()
  private updatedAt: Date

  @Column()
  private type: string

  @Column({ default: true })
  private value: boolean
}
