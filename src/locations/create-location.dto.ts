import {IsNumber, IsString, Max, Min} from "class-validator";

export class CreateLocationDto {
    @IsString()
    title: string;
    @IsString()
    description: string;
    @IsNumber()
    @Min(1)
    @Max(10)
    rating: number;
    @IsString()
    address: string;
}