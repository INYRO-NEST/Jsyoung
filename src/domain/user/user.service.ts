import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService{
    constructor() {}

    async getUserPage() {
        return { user:{
            age : 23,
            name : 'jsy',
            height : 190,
        },
    };
    }

}