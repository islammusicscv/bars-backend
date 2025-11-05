import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {User} from "../user/user.entity";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService) {}

    async signIn(user: User): Promise<any> {
        const payload = { sub: user.id, username: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(username);
        if (!user || !(await bcrypt.compare(pass, user.password))) {
            throw new UnauthorizedException();
        }
        const {password, ...result} = user;
        return result;
    }
}
