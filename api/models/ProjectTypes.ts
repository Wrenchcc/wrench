import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import Users from './Users'
import Projects from './Projects'

@Entity('project_types')
export default class ProjectTypes extends BaseEntity {
  @PrimaryGeneratedColumn()
  private id: number

  @Column()
  private slug: string

  @Column()
  private title: string

  @Column()
  private imageUrl: string
}
