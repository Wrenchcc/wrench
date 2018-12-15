import {
  getRepository,
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import User from '../User'

@Entity('users_settings')
export default class UserSettings extends BaseEntity {
  public static async findOrCreate(where, save) {
    const userSettingsRepo = UserSettings.getRepository()
    const userSettings = await userSettingsRepo.findOne({ where })

    if (userSettings) {
      return userSettings
    }

    return userSettingsRepo.save(save)
  }

  @ManyToOne(() => User, user => user.settings)
  public user: User

  @PrimaryGeneratedColumn()
  public id: number

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @Column()
  public userId: number

  @Column()
  public type: string

  @Column('simple-json')
  public value: string
}

export function getNotificationSettings(userId) {
  return getRepository(UserSettings).findOne({
    where: {
      type: 'notifications',
      userId,
    },
  })
}
