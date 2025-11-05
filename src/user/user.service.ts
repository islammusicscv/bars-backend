import {Injectable, NotFoundException} from '@nestjs/common';
import {DeleteResult, Repository} from "typeorm";
import {User} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateUserDto} from "./create-user.dto";
import {UpdateUserDto} from "./update-user.dto";
import {NotFoundError} from "rxjs";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findById(id: number): Promise<User | null> {
        return await this.userRepository.findOne({ where: {id} });
    }

    async findOne(email: string): Promise<User | null> {
        return await this.userRepository.findOne({ where: {email} });
    }

    delete(id: number): Promise<DeleteResult> {
        return this.userRepository.delete(id);
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
        const user = await this.findById(id);
        if(!user) {
            throw new NotFoundException('User does not exist!!');
        }
        await this.userRepository.update(id,updateUserDto);
        return await this.findById(id);
    }
}
