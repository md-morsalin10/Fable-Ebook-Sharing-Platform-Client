import { NextResponse } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'

export async function proxy(request) {
    const { pathname } = request.nextUrl
    const isDashboardRoute = pathname.includes('/dashboard')

    const session = await auth.api.getSession({
        headers: await headers(),
        query: isDashboardRoute ? { disableCookieCache: true } : {}
    })

    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (isDashboardRoute) {
        if (session?.user?.role === "writer" && session?.user?.plan === "free") {
            return NextResponse.redirect(new URL('/pricing', request.url))
        }
        if (session?.user?.role === "reader") {
            return NextResponse.redirect(new URL('/browse-ebooks', request.url))
        }
    }

    if (session?.user?.role === "writer" && session?.user?.plan === "free") {
        return NextResponse.redirect(new URL('/pricing', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/browse-ebooks/:id', '/browse-ebooks/:id/:slug', '/dashboard/:path*'],
}