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

@Entity('auth_providers')
export default class AuthProvider extends BaseEntity {
  @ManyToOne(() => User, user => user.authProviders)
  public user: User

  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public providerName: string

  @Column({ type: 'bigint', nullable: true })
  public providerId: number

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @Column()
  public userId: string
}
