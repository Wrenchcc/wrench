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
import ProjectType from './ProjectType'

@Entity('users_interested_in')
export default class UserInterestedIn extends BaseEntity {
  @PrimaryColumn('uuid')
  public userId: string

  @PrimaryColumn('uuid')
  public projectTypeId: string

  @ManyToOne(() => User)
  @JoinColumn()
  public user: User

  @ManyToOne(() => ProjectType)
  @JoinColumn()
  public projectType: ProjectType

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date
}
