import {
  Entity,
  Column,
  PrimaryColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('post_translations')
export default class PostTranslation extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @PrimaryColumn('uuid')
  public postId: string

  @Column('text')
  public caption: string

  @Column({ default: 'en' })
  public language: string

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date
}
