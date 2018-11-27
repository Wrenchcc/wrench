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
import AuthToken from './AuthToken'
import AuthProvider from './AuthProvider'
import NotificationSettings from './NotificationSettings'
import Project from './Project'
import ProjectType from './ProjectType'

@Entity('user')
export default class User extends BaseEntity {
  @OneToMany(type => Project, project => project.user)
  public projects: Project[]

  @ManyToMany(type => ProjectType)
  @JoinTable()
  public interestedIn: ProjectType[]

  @OneToMany(type => NotificationSettings, notificationSettings => notificationSettings.user)
  public notificationSettings: NotificationSettings[]

  @OneToMany(type => AuthToken, authToken => authToken.user)
  public authToken: AuthToken[]

  @OneToMany(type => AuthProvider, authProvider => authProvider.user)
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
  private fullName: string

  @Column({ nullable: true })
  private email: string

  @Column({ nullable: true })
  private avatarUrl: string
}
