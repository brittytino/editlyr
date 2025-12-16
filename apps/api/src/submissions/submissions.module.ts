import { Module } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { SubmissionsController } from './submissions.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CommonModule } from '../common/common.module';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [PrismaModule, CommonModule, UsersModule],
    controllers: [SubmissionsController],
    providers: [SubmissionsService],
})
export class SubmissionsModule { }
