import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('user')
export class UserController{
    constructor(private readonly userService: UserService) {}

    @Get('/user-page')
    async getUserPage() {
        const res = await this.userService.getUserPage(); // await 없으면 promise 담김 : await 걸어야함
        return res.user;
    }

    @Post()
    async register(@Body() body) {
        console.log("body : ", body);
        const email = body.email;
        const password = body.password;

        const user = await this.userService.register(email, password);

        return user;
    }
}