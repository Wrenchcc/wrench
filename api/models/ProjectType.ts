import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'

@Entity('project_types')
export default class ProjectType extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  private id: string

  @Column()
  private slug: string

  @Column()
  private title: string

  @Column()
  private imageUrl: string
}
