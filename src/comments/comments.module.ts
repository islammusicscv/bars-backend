import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import {UserModule} from "../user/user.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CommentsEntity} from "./comments.entity";
import {LocationsModule} from "../locations/locations.module";

@Module({
  imports: [TypeOrmModule.forFeature([CommentsEntity]), UserModule, LocationsModule],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
