import type { EntryContext } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';
import { renderToString } from 'react-dom/server';
import { getEnv } from './env.server';

// @ts-expect-error we'll fix this in the extra credit
global.ENV = getEnv();

export default function handleRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    remixContext: EntryContext
) {
    const markup = renderToString(
        <RemixServer context={remixContext} url={request.url} />
    );

    responseHeaders.set('Content-Type', 'text/html');

    return new Response('<!DOCTYPE html>' + markup, {
        headers: responseHeaders,
        status: responseStatusCode,
    });
}