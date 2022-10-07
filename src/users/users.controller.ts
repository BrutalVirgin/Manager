import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUserDto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UsersController {
    constructor (
        private readonly userService : UserService,
    ) {}

    @Post('')
    createUser (@Body() user:CreateUserDto) : Promise<UserEntity> {
    return this.userService.createUser(user);
    }
}
