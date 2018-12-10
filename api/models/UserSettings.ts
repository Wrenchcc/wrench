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
