import {Body, Request, Controller, HttpCode, HttpStatus, Post, UseGuards, Get} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {SignInDto} from "./signIn.dto";
import {AuthGuard} from "@nestjs/passport";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return this.authService.signIn(req.user);
    }

    @UseGuards(AuthGuard('local'))
    @Post('logout')
    async logout(@Request() req) {
        return req.logout();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
