import { Global, Module } from '@nestjs/common';
import { StorageService } from './services/storage.service';
import { QueueService } from './services/queue.service';
import { EmailService } from './services/email.service';
import { CloudinaryService } from './services/cloudinary.service';

@Global()
@Module({
    providers: [StorageService, QueueService, EmailService, CloudinaryService],
    exports: [StorageService, QueueService, EmailService, CloudinaryService],
})
export class CommonModule { }
