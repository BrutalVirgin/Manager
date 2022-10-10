import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../users/user.repository';
import { UserService } from '../users/user.service';
import { AuthService } from '../auth/auth.service';
import { IAuthJwt } from '../interfaces/interfaces';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor (
        private userService: UserService,
        private userRepository: UserRepository,
        private authService: AuthService,
    ) {}

    async canActivate (context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();

        const token = req.headers.authorization;

        if (!token) {
            throw new UnauthorizedException('No Authorization token provided');
        }

        const payload = await this.authService.validateToken(token) as IAuthJwt;

        if (!payload) {
            throw new UnauthorizedException('Invalid Authorization token');
        }

        req.user = await this.userRepository.findById(payload.id);

        if (!req.user) {
            throw new UnauthorizedException('Access token valid, but user not found!');
        }

        return true;
    }
}
