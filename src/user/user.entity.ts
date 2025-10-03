import {BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import * as bcrypt from 'bcrypt';


@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    first_name: string;

    @Column({length: 100})
    last_name: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}