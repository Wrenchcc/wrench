import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import Project from './Project'
import Collection from './Collection'

@Entity('project_collections')
export default class ProjectCollection extends BaseEntity {
  @ManyToOne(() => Project, { onDelete: 'CASCADE' })
  @JoinColumn()
  public project: Project

  @PrimaryColumn('uuid')
  public projectId: string

  @ManyToOne(() => Collection)
  @JoinColumn()
  public collection: Collection

  @PrimaryColumn('uuid')
  public collectionId: string

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date
}
