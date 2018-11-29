import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import User from './User'
import Post from './Post'

enum FileType {
  Image = 'image',
  Video = 'video',
}

enum FileFormat {
  Mp4 = 'mp4',
  Jpeg = 'jpeg',
  Png = 'png',
}

@Entity('files')
export default class File extends BaseEntity {
  @ManyToOne(() => User, user => user.files)
  public user: User

  @ManyToOne(() => Post, post => post.files)
  public post: Post

  @PrimaryGeneratedColumn('uuid')
  private id: string

  @CreateDateColumn()
  private createdAt: Date

  @UpdateDateColumn()
  private updatedAt: Date

  @Column()
  private uri: string

  @Column('enum', { enum: FileType })
  private type: FileType

  @Column('enum', { enum: FileFormat })
  private format: FileFormat
}
