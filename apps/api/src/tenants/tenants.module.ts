import { Module } from '@nestjs/common';
import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenants.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [PrismaModule, UsersModule],
    controllers: [TenantsController],
    providers: [TenantsService],
    exports: [TenantsService],
})
export class TenantsModule { }
