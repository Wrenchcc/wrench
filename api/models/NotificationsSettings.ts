import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import Users from './Users'

@Entity('notifications_settings')
export default class NotificationsSettings extends BaseEntity {
  public static async findOrCreate(where, save) {
    const settingsRepo = NotificationsSettings.getRepository()
    const settings = await settingsRepo.findOne({ where })

    if (settings) {
      return settings
    }
    return settingsRepo.save(save)
  }

  @ManyToOne(type => Users, user => user.settings)
  public user: Users

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
