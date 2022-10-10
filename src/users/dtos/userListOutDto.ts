import { EUsersRole } from '../../interfaces/interfaces';

export class UserListOutDto {
    _id: string;
    email: string;
    role: EUsersRole;
    subordinates: string[] | null;
    createdAt: Date;
    updatedAt: Date;

    constructor (init: Partial<UserListOutDto>) {
        this._id = init._id;
        this.email = init.email;
        this.role = init.role;
        this.subordinates = init.subordinates || null;
        this.createdAt = init.createdAt;
        this.updatedAt = init.updatedAt;
    }
}
