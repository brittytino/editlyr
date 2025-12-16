import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    const url = req.nextUrl
    const hostname = req.headers.get('host') || 'localhost:3000'

    // Define allowed domains (localhost, main domain)
    const isPlatform = hostname === 'localhost:3000' || hostname === 'editlyr.org' || hostname === 'www.editlyr.org'

    // If subdomain (e.g. science.localhost:3000), rewrite to /_tenants/[subdomain]
    // BUT for MVP simplicity with path routing /journals/[slug], we might not use subdomains locally easily.

    // ROBUST LOGIC FOR PRODUCTION:
    // if (!isPlatform) {
    //   const subdomain = hostname.split('.')[0]
    //   return NextResponse.rewrite(new URL(`/_tenants/${subdomain}${url.pathname}`, req.url))
    // }

    // For now, we just pass through but ensured the file exists.
    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
