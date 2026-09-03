import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import {CreateUserDto} from './create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post()
    crear(@Body()dto : CreateUserDto) {
        return this.userService.crear(dto.username, dto.password);
    }
}

