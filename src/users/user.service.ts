import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUserDto';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { EUsersRole } from '../interfaces/interfaces';
import { Types } from 'mongoose';

@Injectable()
export class UserService {
    constructor (
private readonly userRepository: UserRepository,
    ) {
    }

    async create (data: CreateUserDto) : Promise<UserEntity> {
           const user = await this.userRepository.findOne({ email: data.email });
           if (user) {
               throw new HttpException('User with this email is already registered', HttpStatus.BAD_REQUEST);
           }
           else if ((data.role === EUsersRole.user || data.role === EUsersRole.administrator) && data.subordinates) {
               throw new HttpException(`${data.role} cannot have subordinates`, HttpStatus.BAD_REQUEST);
           }
           else if (data.role === EUsersRole.boss && data.subordinates.length < 1) {
               throw new HttpException('Boss must have at least 1 subordinate', HttpStatus.BAD_REQUEST);
           }
           else {
               if (data.subordinates) {
                 await this.checkIds(data.subordinates);
               }

               const newUser = UserEntity.register(data);
               return this.userRepository.create(newUser);
           }
    }

    async checkIds (arr:string[]) {
        arr.map(async (id) => {
            const validObjectId = Types.ObjectId.isValid(id);
            if (!validObjectId) {
                new HttpException('Invalid ObjectId, provide correct id`s', HttpStatus.BAD_REQUEST);
            }

            const foundUser = await this.userRepository.findById(id);
            if (!foundUser) {
                throw new HttpException(`User with id ${id} not found, check your request and try again`, HttpStatus.NOT_FOUND);
            }
        });
    }

    // async createUser (data: CreateUserDto) : Promise<UserEntity> {
    // if (data.subordinates) {
    //     throw new HttpException('User cannot have subordinates', HttpStatus.BAD_REQUEST);
    // }
    // else {
    //     const newUser = UserEntity.register(data);
    //     return this.userRepository.create(newUser);
    // }
    // }
}
