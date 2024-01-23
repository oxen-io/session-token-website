import { revalidateSecret } from 'lib/sanity.api'
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'
import { revalidatePath } from 'next/cache'

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

        // uncomment for tag functionality, just using revalidatePath for now
        // if (body.slug) {
        //     revalidateTag(`${body._type}:${body.slug}`);
        // }
        // else revalidateTag(body._type);

        revalidatePath("/")

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