import {Injectable, NotFoundException} from '@nestjs/common';
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
        return this.locationRepository.findOne({where: {id}});
    }

    delete(id: number): Promise<DeleteResult> {
        return this.locationRepository.delete(id);
    }

    async create(createLocationDto: CreateLocationDto) {
        //nimam še userja prijave, registracije ... zato sem hardcode na 1
        const user = await this.userService.findById(1);
        if (!user) {
            throw new NotFoundException("User does not exists");
        }
        const location = this.locationRepository.create({...createLocationDto,user});
        return await this.locationRepository.save(location);
    }

    async update(id:number, updateLocationDto: UpdateLocationDto) {
        const location = await this.findById(id);
        if (!location) {
            throw new NotFoundException("Location does not exists");
        }
        await this.locationRepository.update(id, updateLocationDto);
        return await this.findById(id);
    }
}
