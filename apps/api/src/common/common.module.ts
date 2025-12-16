import { Global, Module } from '@nestjs/common';
import { StorageService } from './services/storage.service';
import { QueueService } from './services/queue.service';

@Global()
@Module({
    providers: [StorageService, QueueService],
    exports: [StorageService, QueueService],
})
export class CommonModule { }
