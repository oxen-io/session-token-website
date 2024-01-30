import { revalidateSecret } from 'lib/sanity.api'
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

export async function POST(req) {
    try {
        const { body, isValidSignature } = await parseBody(req, revalidateSecret);
        if (!isValidSignature) {
            const message = 'Invalid signature';
            return new Response(message, { status: 401 });
        }

        if (!body?._type) {
            return new Response('Bad Request', { status: 400 });
        }

        if (body.slug) {
            console.log(`${body._type}:${body.slug.current}`)
            revalidateTag(`${body._type}:${body.slug.current}`);
        }

        if(body.type === 'post'){
            console.log('revalidating posts')
            revalidateTag('post')
        }

        return NextResponse.json({
            status: 200,
            revalidated: true,
            now: Date.now(),
            body,
        });
    } catch (err) {
        console.error(err);
        return new Response(err.message, { status: 500 });
    }
}