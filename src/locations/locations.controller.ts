import {Body, Request, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {LocationsService} from "./locations.service";
import {LocationEntity} from "./location.entity";
import {DeleteResult} from "typeorm";
import {CreateLocationDto} from "./create-location.dto";
import {UpdateLocationDto} from "./update-location.dto";
import {AuthGuard} from "@nestjs/passport";

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

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async delete(@Param('id') id: string,@Request() req): Promise<DeleteResult> {
        return await this.locationService.delete(+id,req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() createLocationDto: CreateLocationDto, @Request() req) {
        return this.locationService.create(createLocationDto,req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    async update(@Param('id') id:string, @Body() updateLocationDto: UpdateLocationDto, @Request() req) {
        return this.locationService.update(+id, updateLocationDto,req.user.id);
    }
}
