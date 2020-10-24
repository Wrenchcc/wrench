import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import Post from './Post'
import Project from './Project'
import Collection from './Collection'

@Entity('post_collections')
export default class PostCollection extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @ManyToOne(() => Post, { onDelete: 'CASCADE' })
  @JoinColumn()
  public post: Post

  @PrimaryColumn('uuid')
  public postId: string

  @ManyToOne(() => Project)
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
