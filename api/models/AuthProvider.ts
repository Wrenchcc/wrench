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

@Entity('auth_providers')
export default class AuthProvider extends BaseEntity {
  @ManyToOne(() => User, user => user.authProvider)
  public user: User

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
