import { Types } from 'mongoose';
import { EUsersRole } from '../interfaces/interfaces';

export class UserDo {
     _id: Types.ObjectId;
     email:         string;
     passwordHash:  string | null;
     passwordSalt:  string | null;
     subordinates?: string[] | null;
     role:          EUsersRole;

    constructor (props: Partial<UserDo>) {
        this._id = props._id || null;
        this.email = props.email || null;
        this.passwordHash = props.passwordHash || null;
        this.passwordSalt = props.passwordSalt || null;
        this.subordinates = props.subordinates || null;
        this.role = props.role || null;

    }
}
