import { revalidateSecret } from '@/lib/sanity.api';
import { parseBody } from 'next-sanity/webhook';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Revalidate the cache for a specific CMS resource
 *
 * This endpoint is used to revalidate the cache for a specific CMS resource.
 * It is called by the CMS when a resource is published or updated. The CMS
 * sends a POST request to this endpoint with a JSON body containing the type
 * of the resource and the ID of the resource. The endpoint then revalidates
 * the cache for the resource and returns a JSON response with the status of the revalidation.
 *
 * @param request - The incoming request with a JSON body containing the type and ID of the resource and a signature to verify the request
 * @returns The result of the revalidation as a JSON response
 */
export async function POST(request: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody(request, revalidateSecret);

    if (!isValidSignature) {
      return new NextResponse('Invalid signature', { status: 401 });
    }

    if (!body?._type) {
      return new NextResponse('Bad Request', { status: 400 });
    }

    revalidateTag(body._type);

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (error) {
    return new NextResponse(error instanceof Error ? error.message : 'Internal Server Error', {
      status: 500,
    });
  }
}
