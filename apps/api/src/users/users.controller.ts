import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Role } from '@prisma/client';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    findAll(@Request() req: any) {
        // Return users for this tenant
        // MVP: Assuming user has journalId, returning users of same journal
        // Real impl requires fetching user first to get journalId
        return this.usersService.findAllByJournal(req.user.userId);
    }

    @Post('invite')
    inviteUser(@Request() req: any, @Body() body: { email: string; role: Role }) {
        return this.usersService.inviteUser(req.user.userId, body.email, body.role);
    }
}
