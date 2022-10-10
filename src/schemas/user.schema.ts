import mongoose from 'mongoose';
import { UserDo } from './user.do';
import { EUsersRole } from '../interfaces/interfaces';

export const UserSchema = new mongoose.Schema<UserDo>({
    email:        { type: String, required: true },
    passwordHash: { type: String, required: true },
    passwordSalt: { type: String, required: true },
    subordinates: { type: [String] },
    role:         { type: String, enum: Object.values(EUsersRole), required: true },
}, {
    versionKey: false,
    timestamps: true,
});
