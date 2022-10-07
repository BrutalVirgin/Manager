import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUserDto';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
    constructor (
private readonly userRepository: UserRepository,
    ) {
    }

    async createUser (data: CreateUserDto) : Promise<UserEntity> {
        const user = await this.userRepository.findOne({ email: data.email });
        if (user) {
            throw new HttpException('Admin with this email is already registered', HttpStatus.BAD_REQUEST);
        }
        else {
            const newUser = UserEntity.register(data);
            return this.userRepository.create(newUser);
        }
    }
}
