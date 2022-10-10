import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../users/user.repository';
import { UserCredsDto } from '../users/dtos/userCredsDto';
import { IAuth } from '../interfaces/interfaces';
import { UserEntity } from '../users/user.entity';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor (
        private readonly userRepository: UserRepository,
    ) {
    }
    public async authenticate (userCredsDto:UserCredsDto): Promise<IAuth> {
        const user = await this.userRepository.findOne({ email: userCredsDto.email });

        if (!user) {
            throw new NotFoundException('Email or password incorrect.');
        }

        const isValidPassword = user.validatePassword(userCredsDto.password);

        if (!isValidPassword) {
            throw new BadRequestException('Email or password incorrect.');
        }

        return {
            jwt:       this.generateJwtToken(user),
            expiresIn: Number(process.env.JWT_TTL),
        };
    }

    private generateJwtToken (user: UserEntity): string {
        return jwt.sign(
            {  userId: user._id, role: user.role, email: user.email },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: Number(process.env.JWT_TTL) },
        );
    }

    public validateToken (auth: string) {
        try {
            const token = auth.split(' ')[1];

            return jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        }
        catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }
}
