import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm'
import Tokens from './Tokens'

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  private id: string

  @Column({ unique: true, nullable: true })
  private username: string

  @CreateDateColumn()
  private createdDate: Date

  @UpdateDateColumn()
  private updatedDate: Date

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

  @Column({ default: false })
  private isAdmin: boolean

  @Column({ default: false })
  private isPro: boolean

  @Column({ nullable: true })
  private dynamicLink: string

  @Column({ type: 'bigint', nullable: true })
  private facebookId: number

  // @OneToOne(type => Tokens)
  // @JoinColumn()
  // private tokens: Tokens

  @BeforeInsert()
  private beforeInsert() {
    this.username = 'pontus.abrahamsson'
  }

  private generateUsername(firstName, lastName) {
    return 'pontus.abrahamsson'
  }
}
