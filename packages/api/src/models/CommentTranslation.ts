import {
  Entity,
  Column,
  PrimaryColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('comment_translations')
export default class CommentTranslation extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @PrimaryColumn('uuid')
  public commentId: string

  @Column('text')
  public text: string

  @Column({ default: 'en' })
  public language: string

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt: Date
}
