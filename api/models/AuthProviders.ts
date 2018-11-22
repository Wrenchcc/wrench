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

@Entity('auth_providers')
export default class AuthProviders extends BaseEntity {
  @ManyToOne(type => Users, user => user.authProviders)
  public user: Users

  @PrimaryGeneratedColumn()
  private id: number

  @Column()
  private providerName: string

  @Column({ type: 'bigint', nullable: true })
  private providerId: number

  @CreateDateColumn()
  private createdAt: Date

  @UpdateDateColumn()
  private updatedAt: Date
}
