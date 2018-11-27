import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import User from './User'
import ProjectType from './ProjectType'

@Entity('project')
export default class Project extends BaseEntity {
  @ManyToOne(type => User, user => user.projects)
  public user: User

  @ManyToOne(type => ProjectType, projectType => projectType)
  public projectType: ProjectType

  @PrimaryGeneratedColumn('uuid')
  private id: string

  @Column()
  private title: string

  @Column({ unique: true })
  private slug: string
}
