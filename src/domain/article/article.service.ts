import { Injectable } from "@nestjs/common";

@Injectable()
export class ArticleService{
    constructor() {}

    async getDataPage() {
        return { article:{
            title : "나는 신이다",
            content : "게시글 내용입니다.",
            userId : 10
        },
    };
    }

}