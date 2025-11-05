import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import * as bcrypt from 'bcrypt';
import {LocationEntity} from "../locations/location.entity";
import {CommentsEntity} from "../comments/comments.entity";


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

    @OneToMany(() => LocationEntity, (location) => location.user)
    locations: LocationEntity[];

    @OneToMany(() => CommentsEntity, (comment) => comment.user)
    comments: CommentsEntity[];
}