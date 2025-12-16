import { Module } from '@nestjs/common';
import { PublishingService } from './publishing.service';
import { PublishingController } from './publishing.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [PublishingController],
    providers: [PublishingService],
})
export class PublishingModule { }
