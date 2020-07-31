import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import User from './User'

@Entity('bookmarks')
export default class Bookmarks extends BaseEntity {
  public static async isBookmarked(userId, postId) {
    const isBookmarked = await Bookmarks.findOne({
      where: {
        postId,
        userId,
      },
    })

    return !!isBookmarked
  }

  @PrimaryColumn('uuid')
  public userId: string

  @ManyToOne(() => User)
  @JoinColumn()
  public user: User

  @PrimaryColumn('uuid')
  public postId: string

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date
}
