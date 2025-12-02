import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { LocationEntity } from './location.entity';

@Entity('location_images')
export class LocationImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string; // Ime datoteke, npr. "slika.jpg"

  // Ko se izbriše lokacija, se izbrišejo tudi slike (CASCADE)
  @ManyToOne(() => LocationEntity, (location) => location.images, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'location_id' })
  location: LocationEntity;
}