import { revalidateSecret } from '@/lib/sanity.api';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

export async function POST(request: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody(request, revalidateSecret);
    if (!isValidSignature) {
      const message = 'Invalid signature';
      return new Response(message, { status: 401 });
    }

    if (!body?._type) {
      return new Response('Bad Request', { status: 400 });
    }

    revalidateTag(body._type);

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (err) {
    return new Response(err instanceof Error ? err.message : 'Internal Server Error', {
      status: 500,
    });
  }
}
