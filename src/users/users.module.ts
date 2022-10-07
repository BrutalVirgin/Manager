import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UsersController } from './users.controller';

@Module({
    providers: [
        UserService,
        UserRepository,
    ],
    controllers: [UsersController],
})
export class UsersModule {

}
