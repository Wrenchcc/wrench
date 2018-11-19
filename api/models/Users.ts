import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
  OneToOne,
  JoinColumn,
} from 'typeorm'
import AuthTokens from './AuthTokens'
import AuthProviders from './AuthProviders'
import Notifications from './Notifications'

@Entity()
export default class Users extends BaseEntity {
  @OneToMany(type => Notifications, notifications => notifications.user)
  public notifications: Notifications[]

  @OneToMany(type => AuthTokens, authToken => authToken.user)
  public authTokens: AuthTokens[]

  @OneToMany(type => AuthProviders, authProvider => authProvider.user)
  public authProviders: AuthProviders[]

  @PrimaryGeneratedColumn('uuid')
  private id: string

  @Column({ unique: true, nullable: true })
  private username: string

  @CreateDateColumn()
  private createdAt: Date

  @UpdateDateColumn()
  private updatedAt: Date

  @Column()
  private firstName: string

  @Column()
  private lastName: string

  @Column()
  private fullName: string

  @Column({ nullable: true })
  private email: string

  @Column({ nullable: true })
  private avatarUrl: string
}
