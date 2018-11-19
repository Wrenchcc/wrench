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
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public providerName: string

  @Column({ type: 'bigint', nullable: true })
  private providerId: number

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @ManyToOne(type => User, user => user.authProviders)
  user: User
}
