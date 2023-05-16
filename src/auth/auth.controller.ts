import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalGuard } from "./guards/local.guard";

@Controller('auths')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalGuard)
    @Post('login')
    async logIn(@Req() req) {
        const user = req.user;
        
        console.log('user : ', user);

        return this.authService.logIn(user);
    }
}