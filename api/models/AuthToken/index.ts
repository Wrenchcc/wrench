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
import { PlatformType } from '../enums'

@Entity('auth_tokens')
export default class AuthTokens extends BaseEntity {
  @ManyToOne(() => User, user => user.authTokens)
  public user: User

  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public refreshToken: string

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @Column('enum', { enum: PlatformType })
  public platform: PlatformType
}
