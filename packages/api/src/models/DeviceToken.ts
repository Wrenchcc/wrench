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
import User from './User'
import { PlatformTypes } from './enums'

@Entity('device_tokens')
export default class DeviceToken extends BaseEntity {
  @Column()
  public userId: string

  @Column()
  public token: string

  @ManyToOne(() => User, (user) => user.deviceTokens)
  public user: User

  @PrimaryGeneratedColumn()
  public id: number

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date

  @Column('enum', { enum: PlatformTypes })
  public platform: PlatformTypes
}

export async function getDeviceToken(userId) {
  const token = await DeviceToken.findOne({ where: { userId } })

  return pathOr(false, ['token'], token)
}
