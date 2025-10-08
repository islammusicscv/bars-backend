import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {LocationsService} from "./locations.service";
import {LocationEntity} from "./location.entity";
import {DeleteResult} from "typeorm";
import {CreateLocationDto} from "./create-location.dto";

@Controller('locations')
export class LocationsController {
    constructor(private readonly locationService: LocationsService) {}

    @Get()
    async findAll(): Promise<LocationEntity[]> {
        return await this.locationService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<LocationEntity | null> {
        return await this.locationService.findById(+id);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<DeleteResult> {
        return await this.locationService.delete(+id);
    }

    @Post()
    create(@Body() createLocationDto: CreateLocationDto) {
        return this.locationService.create(createLocationDto);
    }
}
