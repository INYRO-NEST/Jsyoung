import { Controller, Get, Inject } from "@nestjs/common";
import { ArticleService } from "./article.service";

@Controller('article')
export class ArticleController{
    constructor(private readonly articleService: ArticleService) {}

    @Get('/article')
    async getDataPage() {
        const res = await this.articleService.getDataPage(); // await 없으면 promise 담김 : await 걸어야함
        return res.article;
    }
}