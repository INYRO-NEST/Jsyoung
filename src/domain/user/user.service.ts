import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository : Repository<UserEntity>,
    ) {}

    async getUserPage() {
        return { 
            user:{
            age : 23,
            name : 'jsy',
            height : 190,
        },
    };
    }

    async register(email: string, password: string) {
        const user = await this.userRepository.save({
            email: email,
            password: password,
        });

        return user;
    }
}