import {IsNumber, IsOptional, IsString, Max, Min} from "class-validator";

export class UpdateLocationDto {
    @IsOptional()
    @IsString()
    title?: string;
    @IsOptional()
    @IsString()
    description?: string;
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(10)
    rating?: number;
    @IsOptional()
    @IsString()
    address?: string;
}