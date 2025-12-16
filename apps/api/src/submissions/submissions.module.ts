import { Module } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { SubmissionsController } from './submissions.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CommonModule } from '../common/common.module';
import { UsersModule } from '../users/users.module';
import { BillingModule } from '../billing/billing.module';

@Module({
    imports: [PrismaModule, CommonModule, UsersModule, BillingModule],
    controllers: [SubmissionsController],
    providers: [SubmissionsService],
})
export class SubmissionsModule { }
