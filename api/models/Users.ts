import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import AuthTokens from './AuthTokens'
import AuthProviders from './AuthProviders'
import NotificationsSettings from './NotificationsSettings'
import Projects from './Projects'
import ProjectTypes from './ProjectTypes'

@Entity('users')
export default class Users extends BaseEntity {
  @OneToMany(type => Projects, project => project.user)
  public projects: Projects[]

  @ManyToMany(type => ProjectTypes)
  @JoinTable()
  public interestedIn: ProjectTypes[]

  @OneToMany(type => NotificationsSettings, notificationsSettings => notificationsSettings.user)
  public notificationsSettings: NotificationsSettings[]

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
