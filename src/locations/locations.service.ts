import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import {DeleteResult, Repository} from "typeorm";
import {LocationEntity} from "./location.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {UserService} from "../user/user.service";
import {CreateLocationDto} from "./create-location.dto";
import {UpdateLocationDto} from "./update-location.dto";

@Injectable()
export class LocationsService {
    constructor(
        @InjectRepository(LocationEntity)
        private readonly locationRepository: Repository<LocationEntity>,
        private readonly userService: UserService) {}

    findAll(): Promise<LocationEntity[]> {
        return this.locationRepository.find();
    }

    findById(id: number): Promise<LocationEntity | null> {
        return this.locationRepository.findOne({where: {id}, relations: ['user']});
    }

    async delete(id: number, userId: number): Promise<DeleteResult> {
        const location = await this.findById(id);

        if (!location) {
            throw new NotFoundException("Lokacija ne obstaja");
        }

        if (location.user.id != userId) {
            throw new ForbiddenException("Nisi lastnik");
        }

        return this.locationRepository.delete(id);
    }

    async create(createLocationDto: CreateLocationDto, id: number) {
        //nimam še userja prijave, registracije ... zato sem hardcode na 1
        const user = await this.userService.findById(id);
        if (!user) {
            throw new NotFoundException("User does not exists");
        }
        const location = this.locationRepository.create({...createLocationDto,user});
        return await this.locationRepository.save(location);
    }

    async update(id:number, updateLocationDto: UpdateLocationDto, userId: number) {
        const location = await this.findById(id);
        if (!location) {
            throw new NotFoundException("Location does not exists");
        }
        if (location.user.id != userId) {
            throw new ForbiddenException("Nisi lastnik");
        }
        await this.locationRepository.update(id, updateLocationDto);
        return await this.findById(id);
    }
}
