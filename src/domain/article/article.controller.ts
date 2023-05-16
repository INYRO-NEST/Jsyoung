import { Body, Controller, Get, Inject, Post, Req, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { User } from "src/decorators/user.decorator";
import { ArticleService } from "./article.service";

@Controller('articles')
export class ArticleController{
    constructor(private readonly articleService: ArticleService) {}

    @UseGuards(JwtGuard)
    @Post()
    async createArticle(@Body() body, @User() user) {

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
}