import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import slugify from '../utils/slugify'
import AuthToken from './AuthToken'
import AuthProvider from './AuthProvider'
import UserSettings from './UserSettings'
import Notification from './Notification'
import Project from './Project'
import File from './File'
import Post from './Post'
import Comment from './Comment'
import DeviceToken from './DeviceToken'
import { capitalizeWords } from '../utils/strings'

@Entity('users')
export default class User extends BaseEntity {
  public static async saveUsername(userId, username) {
    let name
    let times = 0

    while (times < 100) {
      const generatedUsername = times ? slugify(`${username}-${times}`) : slugify(username)
      const found = await User.findOne({ username: generatedUsername })

      // Note if username found, and the userId is not the same as the saved one
      // Append times to the end (If a user edit its userrname it should not change)
      if (found && found.id !== userId) {
        times += 1
      } else {
        name = generatedUsername
        break
      }
    }

    return name
  }

  public static async createUser(data) {
    let user
    let times = 0

    const { firstName, lastName, fullName } = data

    while (times < 100) {
      try {
        user = await User.save({
          ...data,
          firstName: capitalizeWords(firstName),
          lastName: capitalizeWords(lastName),
          fullName: capitalizeWords(fullName),
          username: times
            ? slugify(`${firstName}.${lastName}-${times}`)
            : slugify(`${firstName}.${lastName}`),
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

  @OneToMany(() => Project, (project) => project.user)
  public projects: Project[]

  @OneToMany(() => Post, (post) => post.user)
  public posts: Post[]

  @OneToMany(() => Comment, (comment) => comment.user)
  public comments: Comment[]

  @OneToMany(() => Notification, (notification) => notification.user)
  public notifications: Notification[]

  @OneToMany(() => File, (file) => file.user)
  public files: File[]

  @OneToMany(() => UserSettings, (settings) => settings.user)
  public settings: UserSettings[]

  @OneToMany(() => AuthToken, (authToken) => authToken.user)
  public authTokens: AuthToken[]

  @OneToMany(() => AuthProvider, (authProvider) => authProvider.user)
  public authProviders: AuthProvider[]

  @OneToMany(() => DeviceToken, (deviceToken) => deviceToken.user)
  public deviceTokens: DeviceToken[]

  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({ unique: true, nullable: true })
  public username: string

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date

  @CreateDateColumn({ type: 'timestamptz' })
  public lastSeen: Date

  @Column({ type: 'timestamptz', nullable: true, default: null })
  public bannedAt: Date

  @Column({ type: 'timestamptz', nullable: true, default: null })
  public deletedAt: Date

  @Column()
  public firstName: string

  @Column()
  public lastName: string

  @Column()
  @Index()
  public fullName: string

  @Column({ nullable: true })
  public email: string

  @Column({ default: false })
  public isSilhouette: boolean

  @Column({ type: 'text', nullable: true })
  public bio: string

  @Column({ nullable: true })
  public website: string

  @Column({ nullable: true })
  public location: string

  @Column({ nullable: true })
  public avatarUrl: string
}

export function getUserById(userId) {
  return User.findOne(userId)
}
