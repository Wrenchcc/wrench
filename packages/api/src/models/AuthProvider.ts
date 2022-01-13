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
import { AuthProviderTypes } from './enums'

@Entity('auth_providers')
export default class AuthProvider extends BaseEntity {
  @ManyToOne(() => User, (user) => user.authProviders)
  public user: User

  @PrimaryGeneratedColumn()
  public id: number

  @Column('enum', { enum: AuthProviderTypes })
  public type: AuthProviderTypes

  @Column()
  public typeId: string

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date

  @Column()
  public userId: string
}
