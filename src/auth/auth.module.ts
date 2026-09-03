import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "../users/users.module";
import {AuthService} from './auth.service';
import {JwtStrategy} from './jwt.strategy'
import { AuthController } from './auth.controller';
import { ConfigService } from "@nestjs/config";
import { ConfigModule} from '@nestjs/config';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {expiresIn: '1h'},
            }),
            inject : [ConfigService],
        }),
    ],
    providers : [AuthService, JwtStrategy],
    controllers : [AuthController],
})
export class AuthModule {}