import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUserDto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { IAuth } from '../interfaces/interfaces';
import { UserCredsDto } from './dtos/userCredsDto';
import { AuthService } from '../auth/auth.service';
import { ReqUser } from '../decorators/userDecorator';
import { JwtAuthGuard } from '../guards/authGuard';
import { UserListOutDto } from './dtos/userListOutDto';
import { ChangeBossDto } from './dtos/changeBossDto';

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

    @Get('')
    @UseGuards(JwtAuthGuard)
    async getListOfUsers (@ReqUser('id') userId:string) : Promise<UserListOutDto> {
    return this.userService.getUsers(userId);
    }

    @Post('change-boss')
    @UseGuards(JwtAuthGuard)
    async changeUsersBoss (@ReqUser('id') userId:string, @Body() data: ChangeBossDto) : Promise<UserEntity> {
        return this.userService.changeBoss(userId, data);
    }
}
