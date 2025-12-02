import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { CommentsEntity } from '../comments/comments.entity';
import { LocationImageEntity } from './location-image.entity';

@Entity('locations')
export class LocationEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  rating: number;
  @Column()
  address: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.locations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => CommentsEntity, (comment) => comment.location)
  comments: CommentsEntity[];

  @OneToMany(() => LocationImageEntity, (image) => image.location, { cascade: true })
  images: LocationImageEntity[];
}
