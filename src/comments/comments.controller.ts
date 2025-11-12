import {Body, Request, Controller, Post, UseGuards, Patch, Delete, Param, Get} from '@nestjs/common';
import {CommentsService} from "./comments.service";
import {AuthGuard} from "@nestjs/passport";
import {CreateCommentDto} from "./create-comment.dto";
import {UpdateCommentDto} from "./update-comment.dto";

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentService: CommentsService) {
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() createCommentDto: CreateCommentDto, @Request() req) {
        return this.commentService.create(createCommentDto,req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto, @Request() req) {
        return this.commentService.update(+id,updateCommentDto, req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    delete(@Param('id') id: string, @Request() req) {
        return this.commentService.delete(+id, req.user.id);
    }

    @Get('location/:id')
    findByLocationId(@Param('id') id: string) {
        return this.commentService.findByLocationId(+id);
    }

}
