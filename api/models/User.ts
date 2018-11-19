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
import AuthToken from './AuthToken'
import AuthProvider from './AuthProvider'

@Entity()
export default class User extends BaseEntity {
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

  @OneToMany(type => AuthToken, authToken => authToken.user)
  authTokens: AuthToken[]

  @OneToMany(type => AuthProvider, authProvider => authProvider.user)
  authProviders: AuthProvider[]
}
