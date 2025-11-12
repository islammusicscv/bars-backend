import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "../user/user.entity";
import {LocationEntity} from "../locations/location.entity";

@Entity('comments')
export class CommentsEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn({name: "user_id"})
    user: User;

    @ManyToOne(() => LocationEntity, (location) => location.comments)
    @JoinColumn({name: "location_id"})
    location: LocationEntity;
}