import { EUsersRole } from '../interfaces/interfaces';
import { Exclude } from 'class-transformer';
import { CreateUserDto } from './dtos/createUserDto';
const crypto = require('crypto');

export class UserEntity {
    public _id: string | null;
    public email: string | null;
    public role : EUsersRole;

    @Exclude()
    public passwordHash: string;
    @Exclude()
    public passwordSalt: string;
    public subordinates?: string[] | null;
    public createdAt: Date;
    public updatedAt: Date;


    constructor (init: Partial<UserEntity>) {
        if (init._id) {
            this._id = init._id?.toString();
        }
        this.email = init.email || null;
        this.passwordHash = init.passwordHash || null;
        this.passwordSalt = init.passwordSalt || null;
        this.role = init.role || null;
        this.subordinates = init.subordinates || null;
        this.createdAt = init.createdAt || null;
        this.updatedAt = init.updatedAt || null;
    }

    static register (user: CreateUserDto): UserEntity {
        const newUser = new UserEntity({
            email:        user.email,
            subordinates: user.subordinates ? user.subordinates : null,
            role:         user.role,
        });

        newUser.setPassword(user.password);
        return newUser;
    }

    public setPassword (newPass: string): void {
        this.passwordSalt = crypto.randomBytes(16).toString('hex');
        const saltWithMagic = UserEntity._hash(this.passwordSalt, process.env.MAGIC_SALT);
        this.passwordHash = UserEntity._hash(newPass, saltWithMagic);
    }

    public validatePassword (pass: string): boolean {
        const saltWithMagic = UserEntity._hash(this.passwordSalt, process.env.MAGIC_SALT);
        const generatedHash = UserEntity._hash(pass, saltWithMagic);

        return generatedHash === this.passwordHash;
    }

    private static _hash (secret, salt): string {
        return crypto.pbkdf2Sync(secret, salt,
            1000, 120, 'sha512').toString('hex');
    }
}
