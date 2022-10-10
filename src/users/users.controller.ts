import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUserDto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { IAuth } from '../interfaces/interfaces';
import { UserCredsDto } from './dtos/userCredsDto';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {
    constructor (
        private readonly userService : UserService,
        private readonly authService: AuthService,
    ) {}

    @Post('')
    createUser (@Body() user:CreateUserDto) : Promise<UserEntity> {
            return this.userService.create(user);
    }

    @Post('login')
    async login (@Body() data: UserCredsDto) : Promise<IAuth> {
        return this.authService.authenticate(data);
    }
}
