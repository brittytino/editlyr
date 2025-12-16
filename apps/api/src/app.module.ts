import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { EditorModule } from './editor/editor.module';
import { ReviewsModule } from './reviews/reviews.module';
import { PublishingModule } from './publishing/publishing.module';
import { TenantsModule } from './tenants/tenants.module';
import { BillingModule } from './billing/billing.module';
import { PluginsModule } from './plugins/plugins.module';
import { PrismaModule } from './prisma/prisma.module';
import { CommonModule } from './common/common.module';

import { AppController } from './app.controller';

@Module({
    imports: [
        ThrottlerModule.forRoot([{
            ttl: 60,
            limit: 10,
        }]),
        PrismaModule,
        CommonModule,
        AuthModule,
        UsersModule,
        SubmissionsModule,
        EditorModule,
        ReviewsModule,
        PublishingModule,
        TenantsModule,
        PluginsModule,
        BillingModule
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        }
    ]
})
export class AppModule { }
