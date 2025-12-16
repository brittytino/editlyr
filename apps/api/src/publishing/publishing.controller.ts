import { Controller, Get, Param } from '@nestjs/common';
import { PublishingService } from './publishing.service';

@Controller('public')
export class PublishingController {
    constructor(private readonly publishingService: PublishingService) { }

    @Get('articles/:id')
    getArticle(@Param('id') id: string) {
        return this.publishingService.getPublishedArticle(id);
    }

    @Get(':journalSlug/articles')
    getJournalArticles(@Param('journalSlug') slug: string) {
        return this.publishingService.getAllPublished(slug);
    }
}
