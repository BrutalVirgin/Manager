import { Model } from 'mongoose';
import { UserDo } from '../shemas/user.do';
import { UserEntity } from './user.entity';
import { OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

export class UserRepository  implements OnModuleInit {
    constructor (
        @InjectModel('User') private userModel: Model<UserDo>,

        // private userModel: Model<UserDo>,
    ) {
    }

    public async onModuleInit () {
         await this.userModel.find();

        // const userIds = users.map((user) => {
        //     return user._id;
        // });

        // await this.userModel.updateMany({ _id: { $in: userIds } }, { $set: { socketIds: [] } });
    }

    public async findOne (options: Partial<UserEntity>): Promise<UserEntity> {
        // eslint-disable-next-line no-useless-catch
        try {
            const user = await this.userModel.findOne(options);
            return user && this.toEntity(user.toObject());
        }
    catch (e) {
        throw e;
        }

    }

    public async findById (id: string): Promise<UserEntity | null> {
        const user = await this.userModel.findById(id);
        return user && this.toEntity(user.toObject());
    }

    public async create (options: UserEntity): Promise<UserEntity> {
            const user = await this.userModel.create(options);
            return user && this.toEntity(user.toObject());
    }

    public toEntity (userDo: UserDo) : UserEntity {
        return new UserEntity({
            ...userDo,
            _id: userDo._id.toHexString(),
        });
    }
}
