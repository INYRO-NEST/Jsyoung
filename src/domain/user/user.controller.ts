import { Controller, Get, Inject } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('user')
export class UserController{
    constructor(private readonly userService: UserService) {}

    @Get('/user-page')
    async getUserPage() {
        const res = await this.userService.getUserPage(); // await 없으면 promise 담김 : await 걸어야함
        return res.user;
    }
}