import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUserDto';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { EUsersRole } from '../interfaces/interfaces';
import { Types } from 'mongoose';
import { UserListOutDto } from './dtos/userListOutDto';
import { ChangeBossDto } from './dtos/changeBossDto';

@Injectable()
export class UserService {
    constructor (
private readonly userRepository: UserRepository,
    ) {}

    async create (data: CreateUserDto) : Promise<UserEntity> {
           const user = await this.userRepository.findOne({ email: data.email });
           if (user) {
               throw new HttpException('User with this email is already registered', HttpStatus.BAD_REQUEST);
           }
           else if ((data.role === EUsersRole.user || data.role === EUsersRole.administrator) && data.subordinates) {
               throw new HttpException(`${data.role} cannot have subordinates`, HttpStatus.BAD_REQUEST);
           }
           else if (data.role === EUsersRole.boss && (!data.subordinates || data.subordinates.length < 1)) {
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
        arr.map((id) => {
            const validObjectId = Types.ObjectId.isValid(id);
            if (!validObjectId) {
               throw new HttpException('Invalid ObjectId, provide correct id`s', HttpStatus.BAD_REQUEST);
            }
        });

      const users =  await this.userRepository.findMany(arr);
      if (users.length < arr.length) {
          throw new HttpException('One or more users with the id you provided does not exist or does not have user rights', HttpStatus.NOT_FOUND);
      }
    }

    async getUsers (userId:string) : Promise<UserListOutDto> {
        const user = await this.userRepository.findOne({ _id: userId });
        let users;
        switch (user.role) {
            case EUsersRole.user: {
                users = [user];
                break;
            }
            case EUsersRole.boss: {
                const usersIds = [...user.subordinates, userId];
                users =  await this.userRepository.findUsersByBoss(usersIds);
                break;
            }
            case EUsersRole.administrator: {
                 users = await this.userRepository.findAll();
            }
        }
        return  users.map((data) => {
            return new UserListOutDto({
                _id:          data._id,
                email:        data.email,
                role:         data.role,
                subordinates: data.subordinates || null,
                createdAt:    data.createdAt,
                updatedAt:    data.updatedAt,
            });
        });
    }

    async changeBoss (userId:string, data: ChangeBossDto) : Promise<UserEntity>  {
        const user = await this.userRepository.findOne({ _id: userId });
        const newBoss = await this.userRepository.findOne({ _id: data.newBossId });

        if (user.role !== EUsersRole.boss) {
            throw new HttpException('Only the boss can change subordinates', HttpStatus.NOT_FOUND);
        }
        if (!newBoss) {
            throw new HttpException(`Boss with id: ${data.newBossId} not found`, HttpStatus.NOT_FOUND);
        }
        if (!user.subordinates.includes(data.subordinateId)) {
            throw new HttpException('The boss can only change bosses for his subordinates or subordinates not found', HttpStatus.BAD_REQUEST);
        }
        if (newBoss.subordinates.includes(data.subordinateId)) {
            throw new HttpException('The subordinate is already under the supervision of the new boss', HttpStatus.BAD_REQUEST);
        }

        const index = user.subordinates.indexOf(data.subordinateId);
        if (index > -1) {
            user.subordinates.splice(index, 1);
        }
        await this.userRepository.update(user);

        newBoss.subordinates.push(data.subordinateId);
        await this.userRepository.update(newBoss);
        return newBoss;
    }
}
