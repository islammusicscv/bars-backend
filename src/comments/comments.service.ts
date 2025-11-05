import {Injectable, NotFoundException} from '@nestjs/common';
import {Repository} from "typeorm";
import {CommentsEntity} from "./comments.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateCommentDto} from "./create-comment.dto";
import {UserService} from "../user/user.service";
import {LocationsService} from "../locations/locations.service";

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(CommentsEntity)
        private readonly commentRepository: Repository<CommentsEntity>,
        private readonly userService: UserService,
        private readonly locationService: LocationsService) {
    }

    async create(createCommentDto: CreateCommentDto, userId: number) {
        const user = await this.userService.findById(userId);

        if (!user) {
            throw new NotFoundException("Ni userja");
        }
        const location = await this.locationService.findById(createCommentDto.location_id);

        if (!location) {
            throw new NotFoundException("Ni lokacije");
        }

        const comment = this.commentRepository.create(
            {content: createCommentDto.content,
            user: user,
            location: location}
        );
        return await this.commentRepository.save(comment);
    }
}
