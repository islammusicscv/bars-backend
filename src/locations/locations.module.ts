import { Module } from '@nestjs/common';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {LocationEntity} from "./location.entity";

@Module({
  imports: [TypeOrmModule.forFeature([LocationEntity])],
  controllers: [LocationsController],
  providers: [LocationsService]
})
export class LocationsModule {}
