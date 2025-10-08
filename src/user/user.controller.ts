import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto} from "./create-user.dto";
import {User} from "./user.entity";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto):Promise<User> {
       return this.userService.create(createUserDto);
    }

    @Get()
    findAll():Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id:string) {
        return this.userService.findById(+id);
    }
}
