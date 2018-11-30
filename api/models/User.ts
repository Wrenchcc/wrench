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
  Index,
} from 'typeorm'
import AuthToken from './AuthToken'
import AuthProvider from './AuthProvider'
import NotificationSettings from './NotificationSettings'
import Notification from './Notification'
import Project from './Project'
import ProjectType from './ProjectType'
import File from './File'

@Entity('users')
export default class User extends BaseEntity {
  @OneToMany(() => Project, project => project.user)
  public projects: Project[]

  @OneToMany(() => Notification, notification => notification.user)
  public notifications: Notification[]

  @OneToMany(() => File, file => file.user)
  public files: File[]

  @ManyToMany(() => ProjectType)
  @JoinTable()
  public interestedIn: ProjectType[]

  @OneToMany(() => NotificationSettings, notificationSettings => notificationSettings.user)
  public notificationSettings: NotificationSettings[]

  @OneToMany(() => AuthToken, authToken => authToken.user)
  public authToken: AuthToken[]

  @OneToMany(() => AuthProvider, authProvider => authProvider.user)
  public authProvider: AuthProvider[]

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
  @Index()
  private fullName: string

  @Column({ nullable: true })
  private email: string

  @Column({ nullable: true })
  private avatarUrl: string
}
