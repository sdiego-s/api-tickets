import { IsString, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto{

    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    password : string

    @IsString()
    @IsNotEmpty()
    username : string
}