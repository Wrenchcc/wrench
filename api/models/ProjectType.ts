import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'

@Entity('project_types')
export default class ProjectType extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column()
  public slug: string

  @Column()
  public title: string

  @Column()
  public imageUrl: string
}
