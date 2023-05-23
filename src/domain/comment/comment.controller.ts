import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { User } from "src/decorators/user.decorator";
import { CreateCommentDto } from "src/dtos/comment/create-comment.dto";
import { CommentService } from "./comment.service";
import { ApiBearerAuth, ApiBody, ApiOperation } from "@nestjs/swagger";

@Controller('comments')
export class CommentController{
    constructor(
        private readonly commentService: CommentService) {}

    @ApiOperation({
        summary : '댓글 작성 API',
    })
    @ApiBody({
        type : CreateCommentDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Post()
    async creatComment(@Body() body : CreateCommentDto, @User() user){
        const content = body.content;
        const parentId = body?.parentId;
        const articleId = body.articleId;
        const userId = user.id;

        const comment = await this.commentService.createComment(
            content, 
            parentId, 
            articleId, 
            userId,
        );


        return comment;
    }

    @UseGuards(JwtGuard)
    @Put('/:id')
    async updateComment(@Body() body, @User() user, @Param('id') id) {
        const content = body.content;
        const userId = user.id;
        const commentId = id;

        const res = await this.commentService.modifyComment(
            commentId, 
            userId, 
            content,
        );

        return res;
    }

    @UseGuards(JwtGuard)
    @Delete('/:id')
    async deleteComment(@Param('id') id, @User() user) {
        const commentId = id;
        const userId = user.id;

        const res = await this.commentService.removeComment(commentId, userId);

        return res;
    }

    @Get('/:id')
    async readCommentListByUser(@User() user){
        const userId = user.id;

        const res = await this.commentService.getCommentListByUser(userId);

        return res;
    }
}