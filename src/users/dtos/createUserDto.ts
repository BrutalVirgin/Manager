import {
    IsEmail, IsEnum,
    IsNotEmpty,
    IsString, MinLength,
} from 'class-validator';
import { EUsersRole } from '../../interfaces/interfaces';

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsEnum(EUsersRole)
    role: EUsersRole;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}
