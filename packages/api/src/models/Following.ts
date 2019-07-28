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
import Project from './Project'

@Entity('following')
export default class Following extends BaseEntity {
  public static async isFollower(userId, projectId) {
    const isFollower = await Following.findOne({
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

  @ManyToOne(() => Project, { onDelete: 'CASCADE' })
  @JoinColumn()
  public project: Project

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date
}
