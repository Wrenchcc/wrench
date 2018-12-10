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
  Like,
} from 'typeorm'
import generateSlug from 'api/utils/generateSlug'
import AuthToken from './AuthToken'
import AuthProvider from './AuthProvider'
import NotificationSettings from './NotificationSettings'
import Notification from './Notification'
import Project from './Project'
import File from './File'
import Post from './Post'
import Comment from './Comment'
import DeviceToken from './DeviceToken'

@Entity('users')
export default class User extends BaseEntity {
  // TODO: Generate dynamicLink
  public static async createUser(data) {
    let user
    let times = 0

    const { firstName, lastName } = data

    while (times < 100) {
      try {
        user = await User.save({
          ...data,
          username: times
            ? generateSlug(`${firstName}.${lastName}-${times}`)
            : generateSlug(`${firstName}.${lastName}`),
        })
        break
      } catch (err) {
        if (!err.detail.includes('already exists')) {
          throw err
        }
      }

      times += 1
    }

    return user
  }

  @OneToMany(() => Project, project => project.user)
  public projects: Project[]

  @OneToMany(() => Post, post => post.user)
  public posts: Post[]

  @OneToMany(() => Comment, comment => comment.user)
  public comments: Comment[]

  @OneToMany(() => Notification, notification => notification.user)
  public notifications: Notification[]

  @OneToMany(() => File, file => file.user)
  public files: File[]

  @OneToMany(() => NotificationSettings, notificationSettings => notificationSettings.user)
  public notificationSettings: NotificationSettings[]

  @OneToMany(() => AuthToken, authToken => authToken.user)
  public authToken: AuthToken[]

  @OneToMany(() => AuthProvider, authProvider => authProvider.user)
  public authProvider: AuthProvider[]

  @OneToMany(() => DeviceToken, deviceToken => deviceToken.user)
  public deviceToken: DeviceToken[]

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

  @Column({ unique: true, nullable: true })
  private dynamicLink: string
}
