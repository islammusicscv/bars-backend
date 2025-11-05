import {Body, Request, Controller, Post, UseGuards} from '@nestjs/common';
import {CommentsService} from "./comments.service";
import {AuthGuard} from "@nestjs/passport";
import {CreateCommentDto} from "./create-comment.dto";

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentService: CommentsService) {
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() createCommentDto: CreateCommentDto, @Request() req) {
        return this.commentService.create(createCommentDto,req.user.id);
    }
}
