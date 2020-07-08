import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import Post from './Post'
import Collection from './Collection'

@Entity('post_collections')
export default class PostCollection extends BaseEntity {
  @ManyToOne(() => Post)
  @JoinColumn()
  public post: Post

  @PrimaryColumn('uuid')
  public postId: string

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
