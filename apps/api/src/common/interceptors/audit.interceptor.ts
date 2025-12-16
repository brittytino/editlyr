import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
    constructor(private prisma: PrismaService) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const method = request.method;

        // Only log state-changing methods
        if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
            return next.handle().pipe(
                tap(async () => {
                    const user = request.user;
                    // MVP: Only log if we have an authenticated user with a journal context
                    if (user && user.journalId) {
                        try {
                            await this.prisma.auditLog.create({
                                data: {
                                    action: `${method} ${request.route.path}`,
                                    userId: user.userId || user.id, // Adaptation for different auth strategies
                                    journalId: user.journalId,
                                    metadata: {
                                        path: request.url,
                                        body: ['password'].reduce((acc, key) => { delete acc[key]; return acc; }, { ...request.body }) // Redact password
                                    }
                                }
                            });
                        } catch (e) {
                            console.error("Audit Log Failed", e);
                        }
                    }
                }),
            );
        }

        return next.handle();
    }
}
