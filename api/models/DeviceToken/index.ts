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
import { PlatformType } from '../enums'

@Entity('device_tokens')
export default class DeviceToken extends BaseEntity {
  @Column()
  public userId: string

  @Column()
  public token: string

  @ManyToOne(() => User, user => user.deviceTokens)
  public user: User

  @PrimaryGeneratedColumn()
  public id: number

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @Column('enum', { enum: PlatformType })
  public platform: PlatformType
}

export function getDeviceToken(userId) {
  return getRepository(DeviceToken).findOne({ where: { userId } })
}
