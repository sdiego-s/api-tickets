import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
    private usersRepository : Repository <User>,
    ) {}

    async crear(username:string, password: string) : Promise <User> {
        const passwordHasheada = await bcrypt.hash(password, 10);
        const usuario = this.usersRepository.create({
            username,
            password : passwordHasheada,
        });
        return this.usersRepository.save(usuario);
    }

    async buscarPorUsername(username: string) : Promise <User  | null> {
        return this.usersRepository.findOne({where : {username}});
    }
}