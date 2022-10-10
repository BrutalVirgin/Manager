import { Types } from 'mongoose';
import { EUsersRole } from '../interfaces/interfaces';

export class UserDo {
     _id: Types.ObjectId;
     email:         string;
     passwordHash:  string | null;
     passwordSalt:  string | null;
     subordinates?: string[] | null;
     role:          EUsersRole;

    constructor (init: Partial<UserDo>) {
        this._id = init._id || null;
        this.email = init.email || null;
        this.passwordHash = init.passwordHash || null;
        this.passwordSalt = init.passwordSalt || null;
        this.subordinates = init.subordinates || null;
        this.role = init.role || null;

    }
}
