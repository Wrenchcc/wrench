import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import { pathOr } from 'ramda'
import { DEFAULT_LOCALE } from '../utils/locale'
import User from './User'

export const NOTIFICATIONS_COLUMN = 'notifications'
export const LOCALE_COLUMN = 'locale'
export const TIMEZONE_COLUMN = 'timezone'

@Entity('users_settings')
export default class UserSettings extends BaseEntity {
  public static async findOrCreate(where, save) {
    const userSettings = await UserSettings.findOne({ where })

    if (userSettings) {
      return userSettings
    }

    return UserSettings.save(save)
  }

  @ManyToOne(() => User, (user) => user.settings)
  public user: User

  @PrimaryGeneratedColumn()
  public id: number

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date

  @Column()
  public userId: string

  @Column()
  public type: string

  @Column('json')
  public value: string
}

export async function getNotificationSettings(userId) {
  const notificationSettings = await UserSettings.findOne({
    where: {
      type: NOTIFICATIONS_COLUMN,
      userId,
    },
  })

  return pathOr(false, ['value'], notificationSettings)
}

export async function getUserLocale(userId) {
  const locale = await UserSettings.findOne({
    where: {
      type: LOCALE_COLUMN,
      userId,
    },
  })

  return pathOr(DEFAULT_LOCALE, ['value'], locale)
}
