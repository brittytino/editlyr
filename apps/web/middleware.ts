import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    const url = req.nextUrl

    // Get hostname (e.g. journal1.editlyr.local:3000)
    let hostname = req.headers.get('host') || ''

    // Remove port if present
    if (hostname.includes(':')) {
        hostname = hostname.split(':')[0]
    }

    const searchParams = req.nextUrl.searchParams.toString()
    // Get the pathname of the request (e.g. /, /about, /blog/first-post)
    const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`

    // Rewrites for landing page
    if (
        hostname === 'localhost' ||
        hostname === 'editlyr.org' ||
        hostname === 'www.editlyr.org' ||
        hostname === 'editlyr.local' // Local dev alias
    ) {
        return NextResponse.next()
    }

    // Subdomain resolution (journal1.editlyr.local -> journal1)
    const subdomain = hostname.split('.')[0]

    // If it's a tenant subdomain, rewrite to /_tenants/[subdomain]
    // However, our current app structure is monolithic for MVP (dashboard/public merged)
    // To strictly follow the "Runbook" which implies multi-tenancy:

    // If we are accessing a tenant domain, we might want to rewrite it to a specific journal path
    // OR we just inject the header 'x-journal-slug' for the app to use.

    // For this implementation plan (Phase 5), we will simplify:
    // We will assume the app handles [subdomain] logic via the API, 
    // but here we can rewrite to ensure the dashboard knows context.

    // NOTE: Since the current directory structure is NOT set up for /_tenants/[slug],
    // we will stick to the header injection strategy for now unless we refactor the whole app folder.
    // The safest "SaaS" way without breaking existing /dashboard routes is:

    const requestHeaders = new Headers(req.headers)
    requestHeaders.set('x-journal-slug', subdomain)
    requestHeaders.set('x-url', req.url)

    // For public pages (e.g. /, /articles), we might want to show the journal's home
    // Rewrite / -> /_sites/[subdomain] is a common pattern, but we don't have that folder.
    // We will simple Add the header and let the Server Components read it.

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    })
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
