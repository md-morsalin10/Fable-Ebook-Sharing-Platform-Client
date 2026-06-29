import { NextResponse } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'

export async function proxy(request) { 
    const { pathname } = request.nextUrl
    const isDashboardRoute = pathname.startsWith('/dashboard')

    const session = await auth.api.getSession({
        headers: await headers(),
        query: isDashboardRoute ? { disableCookieCache: true } : {}
    })

   
    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

   
    if (session?.user?.role === "writer" && session?.user?.plan === "free") {
        return NextResponse.redirect(new URL('/pricing', request.url))
    }

   
    if (isDashboardRoute) {
        const role = session?.user?.role;

      
        if (role === "reader" && !pathname.startsWith('/dashboard/reader')) {
            return NextResponse.redirect(new URL('/dashboard/reader', request.url))
        }


        if (role === "writer" && !pathname.startsWith('/dashboard/writer')) {
            return NextResponse.redirect(new URL('/dashboard/writer', request.url))
        }


        if (role === "admin" && !pathname.startsWith('/dashboard/admin')) {
            return NextResponse.redirect(new URL('/dashboard/admin', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
   
    matcher: ['/browse-ebooks/:id', '/browse-ebooks/:id/:slug', '/dashboard/writer'],
}