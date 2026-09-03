import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService{
    constructor(
        private usersService : UsersService,
        private jwtService : JwtService,
    ){}

    async login (username : string, password: string) {
        const usuario = await this.usersService.buscarPorUsername(username);

        if(!usuario) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const passwordValida = await bcrypt.compare(password, usuario.password);

        if(!passwordValida) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const payload = {sub: usuario.id, username: usuario.username};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
