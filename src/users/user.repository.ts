import { Model } from 'mongoose';
import { UserDo } from '../shemas/user.do';
import { UserEntity } from './user.entity';

export class UserRepository   {
    constructor (
        private userModel: Model<UserDo>,
    ) {
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
