import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { LocationEntity } from './location.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { CreateLocationDto } from './create-location.dto';
import { UpdateLocationDto } from './update-location.dto';
import { LocationImageEntity } from './location-image.entity';
import * as fs from 'node:fs';
import { CommentsEntity } from '../comments/comments.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,
    @InjectRepository(LocationImageEntity)
    private readonly imageRepository: Repository<LocationImageEntity>,
    private readonly userService: UserService,
    @InjectRepository(CommentsEntity)
    private commentsRepository: Repository<CommentsEntity>,
  ) {}

  findAll(): Promise<LocationEntity[]> {
    return this.locationRepository.find({ relations: ['images', 'user'] });
  }

  findById(id: number): Promise<LocationEntity | null> {
    return this.locationRepository.findOne({
      where: { id },
      relations: ['user', 'images'],
    });
  }

  async delete(id: number, userId: number): Promise<DeleteResult> {
    const location = await this.locationRepository.findOne({
      where: { id },
      relations: ['user', 'comments', 'images'],
    });

    if (!location) {
      throw new NotFoundException('Lokacija ne obstaja');
    }

    if (location.user.id != userId) {
      throw new ForbiddenException('Nisi lastnik');
    }

    if (location.images && location.images.length > 0) {
      for (const image of location.images) {
        const filePath = `./uploads/${image.url}`;
        try {
          // Preverimo če datoteka obstaja in jo izbrišemo
          if (fs.existsSync(filePath)) {
            await fs.promises.unlink(filePath);
          }
        } catch (err) {
          console.error(`Napaka pri brisanju datoteke ${filePath}:`, err);
        }
      }
    }

    await this.commentsRepository.remove(location.comments);

    await this.locationRepository.remove(location);

    // Vrnemo "fake" DeleteResult, ker remove ne vrača tega, controller pa to pričakuje
    return { raw: [], affected: 1 };
  }

  async create(createLocationDto: CreateLocationDto, id: number) {
    //nimam še userja prijave, registracije ... zato sem hardcode na 1
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('User does not exists');
    }
    const location = this.locationRepository.create({
      ...createLocationDto,
      user,
    });
    return await this.locationRepository.save(location);
  }

  async update(
    id: number,
    updateLocationDto: UpdateLocationDto,
    userId: number,
  ) {
    const location = await this.findById(id);
    if (!location) {
      throw new NotFoundException('Location does not exists');
    }
    if (location.user.id != userId) {
      throw new ForbiddenException('Nisi lastnik');
    }
    await this.locationRepository.update(id, updateLocationDto);
    return await this.findById(id);
  }

  async addImages(
    locationId: number,
    files: Array<Express.Multer.File>,
    userId: number,
  ) {
    const location = await this.findById(locationId);

    if (!location) {
      throw new NotFoundException('Lokacija ne obstaja');
    }
    if (location.user.id != userId) {
      throw new ForbiddenException('Nisi lastnik');
    }

    const savedImages: LocationImageEntity[] = [];
    for (const file of files) {
      const image = new LocationImageEntity();
      image.url = file.filename; // Shranimo samo ime datoteke
      image.location = location;
      const saved = await this.imageRepository.save(image);
      savedImages.push(saved);
    }

    return savedImages;
  }
}
