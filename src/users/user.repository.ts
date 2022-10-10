import { Model } from 'mongoose';
import { UserDo } from '../shemas/user.do';
import { UserEntity } from './user.entity';
import { OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EUsersRole } from '../interfaces/interfaces';

export class UserRepository  implements OnModuleInit {
    constructor (
        @InjectModel('User') private userModel: Model<UserDo>,
    ) {}

    public async onModuleInit () {
         await this.userModel.find();
    }

    public async findOne (options: Partial<UserEntity>): Promise<UserEntity> {
        const user = await this.userModel.findOne(options);
        return user && this.toEntity(user.toObject());
    }

    public async findById (id: string): Promise<UserEntity | null> {
        const user = await this.userModel.findById(id);
        return user && this.toEntity(user.toObject());
    }

    public async findMany (ids:string[]): Promise<UserEntity[] | null> {
        const users = await this.userModel.find({ '_id': { $in: ids }, role: EUsersRole.user });
        return users && users.map((user) => {
            return this.toEntity(user.toObject());
        });
    }

   public async findUsersByBoss (subordinates:string[]) : Promise<UserEntity[]> {
       const users = await this.userModel.find({ '_id': { $in: subordinates } });
       return users && users.map((user) => {
           return this.toEntity(user.toObject());
       });
   }

   public async findAll () : Promise<UserEntity[]> {
       const users = await this.userModel.find();
       return users && users.map((user) => {
           return this.toEntity(user.toObject());
       });
   }

    public async create (options: UserEntity): Promise<UserEntity> {
            const user = await this.userModel.create(options);
            return user && this.toEntity(user.toObject());
    }

    public async update (user: UserEntity): Promise<any> {
            await this.userModel.updateOne({ _id: user._id }, (user));
    }

    public toEntity (userDo: UserDo) : UserEntity {
        return new UserEntity({
            ...userDo,
            _id: userDo._id.toHexString(),
        });
    }
}
