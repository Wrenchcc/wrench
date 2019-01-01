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
import { pathOr } from 'ramda'
import { defaultLocale } from 'shared/locale'
import User from '../User'

export const NOTIFICATIONS_COLUMN = 'notifications'
export const LOCALE_COLUMN = 'locale'

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
  public userId: string

  @Column()
  public type: string

  @Column()
  public value: string
}

export function getNotificationSettings(userId) {
  return getRepository(UserSettings).findOne({
    where: {
      type: NOTIFICATIONS_COLUMN,
      userId,
    },
  })
}

export async function getUserLocale(userId) {
  const locale = await getRepository(UserSettings).findOne({
    where: {
      type: LOCALE_COLUMN,
      userId,
    },
  })

  return pathOr(defaultLocale, ['value'], locale)
}
