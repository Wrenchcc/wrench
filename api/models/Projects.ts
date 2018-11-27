import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import Users from './Users'
import ProjectTypes from './ProjectTypes'

@Entity('projects')
export default class Projects extends BaseEntity {
  @ManyToOne(type => Users, user => user.projects)
  public user: Users

  @ManyToOne(type => ProjectTypes, projectTypes => projectTypes)
  public projectType: ProjectTypes

  @PrimaryGeneratedColumn('uuid')
  private id: string

  @Column()
  private title: string

  @Column({ unique: true })
  private slug: string
}
