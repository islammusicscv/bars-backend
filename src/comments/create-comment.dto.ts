import {IsNotEmpty, IsNumber, IsString, MinLength} from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty()
    @MinLength(1)
    @IsString()
    content: string;

    @IsNotEmpty()
    @IsNumber()
    location_id: number;
}