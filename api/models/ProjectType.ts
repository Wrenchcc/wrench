import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'

@Entity('project_type')
export default class ProjectType extends BaseEntity {
  @PrimaryGeneratedColumn()
  private id: number

  @Column()
  private slug: string

  @Column()
  private title: string

  @Column()
  private imageUrl: string
}
