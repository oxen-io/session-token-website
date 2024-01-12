import { revalidateTag, revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

export async function POST(req) {
    try {
        const { isValidSignature, body } = await parseBody(
            req,
            process.env.SANITY_REVALIDATE_SECRET,
        )

        if (!isValidSignature) {
            const message = 'Invalid signature'
            return new Response(JSON.stringify({ message, isValidSignature, body }), { status: 401 })
        }

        if (!body?._type) {
            const message = 'Bad Request'
            return new Response({ message, body }, { status: 400 })
        }

        if (body?.slug?.current) {
            console.log(`revalidating ${`${body._type}_${body.slug.current}`}`)
            revalidateTag(`${body._type}_${body.slug.current}`)
        }

        revalidatePath('/', 'layout')

        return NextResponse.json({ body })
    } catch (err) {
        console.error(err)
        return new Response(err.message, { status: 500 })
    }
}