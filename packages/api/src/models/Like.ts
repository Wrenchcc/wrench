import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm'
import { LikeTypes } from './enums'
import User from './User'

@Entity('likes')
export default class Likes extends BaseEntity {
  public static async isLiked(userId, typeId) {
    const isLiked = await Likes.findOne({
      where: {
        typeId,
        userId,
      },
    })

    return !!isLiked
  }

  @PrimaryColumn('uuid')
  public userId: string

  @ManyToOne(() => User)
  @JoinColumn()
  public user: User

  @Column('enum', { enum: LikeTypes })
  public type: LikeTypes

  @PrimaryColumn('uuid')
  public typeId: string

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date
}
