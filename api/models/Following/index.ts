import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import User from '../User'
import Project from '../Project'

@Entity('following')
export default class Following extends BaseEntity {
  public static async isFollower(userId, projectId) {
    const FollowingRepo = Following.getRepository()
    const isFollower = await FollowingRepo.findOne({
      where: {
        projectId,
        userId,
      },
    })

    return !!isFollower
  }

  @PrimaryColumn('uuid')
  public userId: string

  @PrimaryColumn('uuid')
  public projectId: string

  @ManyToOne(() => User)
  @JoinColumn()
  public user: User

  @ManyToOne(() => Project)
  @JoinColumn()
  public project: Project

  @CreateDateColumn()
  private createdAt: Date

  @UpdateDateColumn()
  private updatedAt: Date
}
