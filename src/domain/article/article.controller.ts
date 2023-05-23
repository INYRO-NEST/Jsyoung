import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation } from "@nestjs/swagger";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { User } from "src/decorators/user.decorator";
import { CreateArticleDto } from "src/dtos/article/create-article.dto";
import { ArticleService } from "./article.service";

@Controller('articles')
export class ArticleController{
    constructor(private readonly articleService: ArticleService) {}

    @ApiOperation({
        summary : '게시글 작성 API',
    })
    @ApiBody({
        type : CreateArticleDto,
    })
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Post()
    async createArticle(@Body() body : CreateArticleDto, @User() user) {

        const title = body.title;
        const content = body.content;
        const userId = user.id;

        const article = await this.articleService.createArticle(
            title,
            content,
            userId,
        );

        return article;
    }
    
    @Get('/:id')
    async readArticle(@Param('id') id){
        const articleId = id;
        
        const article = await this.articleService.getArticle(articleId);

        return article;
    }

    @UseGuards(JwtGuard)
    @Put('/:id')
    async updateArticle(@Param('id') id, @User() user, @Body() body) {
        const userId = user.id;
        const articleId = id;
    
        const title = body.title;
        const content = body.content;

        const article = await this.articleService.modifyArticle(
            userId,
            articleId,
            title,
            content,
        );

        return article;
    }

    @UseGuards(JwtGuard)
    @Delete('/:id')
    async deleteArticle(@Param('id') id, @User() user) {
        const userId = user.id;
        const articleId = id;
    
        const res = await this.articleService.removeArticle(userId, articleId);
    
        return res;
    }
}