import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'

export function GET(request) {
    draftMode().disable()
    const url = new URL(request.nextUrl)
    return NextResponse.redirect(new URL('/', url.origin))
}
