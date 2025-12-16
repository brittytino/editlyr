import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module'; // Ensure users module exports UsersService
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersService } from '../users/users.service'; // Temp direct import

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'secretKey',
            signOptions: { expiresIn: '60m' },
        }),
    ],
    providers: [AuthService, JwtStrategy, UsersService], // UsersService provider for mock
    exports: [AuthService],
})
export class AuthModule { }
