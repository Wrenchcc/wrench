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
import Post from './Post'

@Entity('likes')
export default class Likes extends BaseEntity {
  public static async isLiked(userId, postId) {
    const LikesRepo = Likes.getRepository()
    const isLiked = await LikesRepo.findOne({
      where: {
        postId,
        userId,
      },
    })

    return !!isLiked
  }

  @PrimaryColumn('uuid')
  public userId: string

  @PrimaryColumn('uuid')
  public postId: string

  @ManyToOne(() => User)
  @JoinColumn()
  public user: User

  @ManyToOne(() => Post)
  @JoinColumn()
  public post: Post

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date
}
