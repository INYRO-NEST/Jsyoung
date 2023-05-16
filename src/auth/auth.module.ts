import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/entities/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (ConfigService: ConfigService) => {
                return {
                    secret: ConfigService.get('JWT_SECRET'),
                    signOptions: { expiresIn: '30m'},
                };
            },
        }),
    ],
    controllers: [AuthController],
    providers : [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}