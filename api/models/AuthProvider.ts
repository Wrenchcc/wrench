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

@Entity()
export default class AuthProvider extends BaseEntity {
  @ManyToOne(type => User, user => user.authProviders)
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
